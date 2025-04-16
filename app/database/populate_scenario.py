import os
import pandas as pd
import numpy as np
from psycopg2 import sql
import sys

sys.path.append('..')
from database.config import load_config
from database.connect import connect

# Define table dependencies (which tables need to be loaded before others)
TABLE_DEPENDENCIES = {
    "child_advocacy_center": [],  # No dependencies
    "cac_agency": ["child_advocacy_center"],
    "employee": ["child_advocacy_center", "cac_agency"],
    "employee_account": ["employee"],
    "person": ["child_advocacy_center"],
    "cac_case": ["child_advocacy_center", "cac_agency"],
    "case_person": ["person", "cac_case", "child_advocacy_center"],
    "case_mh_assessment_instrument": [],  # No dependencies
    "case_mh_treatment_models": [],  # No dependencies
    "case_mh_assessment": ["child_advocacy_center", "cac_case", "cac_agency", "case_mh_assessment_instrument", "employee"],
    "case_mh_assessment_measure_scores": ["child_advocacy_center", "cac_case", "case_mh_assessment", "case_mh_assessment_instrument"],
    "case_mh_assessment_diagnosis": ["cac_case", "cac_agency"],
    "case_mh_session_log_enc": ["child_advocacy_center", "cac_case", "cac_agency", "employee"],
    "case_mh_session_attendee": ["person", "child_advocacy_center", "cac_case", "case_mh_session_log_enc"],
    "case_mh_session_attribute_group": ["child_advocacy_center", "cac_case", "case_mh_session_log_enc"],
    "case_mh_treatment_plans": ["child_advocacy_center", "cac_case", "cac_agency", "employee", "case_mh_treatment_models"],
    "case_mh_provider": ["cac_agency", "cac_case", "employee"],
    "case_mh_service_barriers": [],  # No dependencies
    "case_va_session_log": ["child_advocacy_center", "cac_case", "cac_agency"],
    "case_va_session_attendee": ["cac_case", "case_va_session_log", "person"],
    "case_va_session_service": ["child_advocacy_center", "case_va_session_log"]
}

def sort_tables_by_dependencies(tables):
    """
    Sort tables by their dependencies to ensure foreign key constraints are respected.
    """
    # Create a mapping of tables to their dependencies
    dependency_map = {table: TABLE_DEPENDENCIES.get(table, []) for table in tables}
    
    # Topological sort algorithm
    visited = set()
    result = []
    
    def dfs(node):
        if node in visited:
            return
        visited.add(node)
        for dep in dependency_map.get(node, []):
            if dep in tables:  # Only consider dependencies that are in our tables list
                dfs(dep)
        result.append(node)
    
    # Visit all nodes
    for table in tables:
        dfs(table)
    
    return result

def main(scenario_config):
    """
    Populate the database with data from a scenario.
    
    Args:
        scenario_config: A dictionary containing:
            - scenario_path: Path to the scenario directory
            - tables: List of tables to populate
    """
    try:
        # Load database configuration
        config = load_config()
        conn = connect(config)
        
        if not conn:
            print("[red]Failed to connect to database. Check your database.ini configuration.")
            return False
        
        scenario_path = scenario_config["scenario_path"]
        tables = scenario_config["tables"]
        
        # Sort tables by dependencies
        sorted_tables = sort_tables_by_dependencies(tables)
        print(f"[green]Tables will be loaded in this order: {', '.join(sorted_tables)}")
        
        # For each table in the scenario (in dependency order)
        for table in sorted_tables:
            # Load the CSV file
            csv_path = os.path.join(scenario_path, f"{table}_data.csv")
            if not os.path.exists(csv_path):
                print(f"[yellow]Warning: No CSV file found for table {table}")
                continue
                
            print(f"[yellow]Loading data for table {table}...")
            
            try:
                # Read the CSV file
                df = pd.read_csv(csv_path)
                
                # Clean up the data - replace NaN with None
                df = df.replace({np.nan: None})
                
                # Skip if there's no data
                if df.empty:
                    print(f"[yellow]No data found in CSV for {table}")
                    continue
                
                # Get column names from CSV
                columns = df.columns.tolist()
                
                # Clear existing data from the table
                with conn.cursor() as cursor:
                    cursor.execute(sql.SQL("DELETE FROM {}").format(sql.Identifier(table)))
                    print(f"[green]Cleared existing data from {table}")
                
                # Find the corresponding SQL file in the data_tables_variables directory
                sql_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 
                                            "data_tables_variables", f"{table}.sql")
                
                if not os.path.exists(sql_file_path):
                    print(f"[red]SQL file not found for table {table}. Skipping.")
                    continue
                
                # Read the SQL insert statement
                with open(sql_file_path, "r") as sql_file:
                    insert_sql = sql_file.read()
                
                # Now insert each row
                successful_inserts = 0
                failed_inserts = 0
                
                with conn.cursor() as cursor:
                    for _, row in df.iterrows():
                        try:
                            # Convert values to proper types
                            processed_row = []
                            for val in row:
                                # Convert string 'None' to actual None
                                if isinstance(val, str) and val.lower() == 'none':
                                    processed_row.append(None)
                                # Handle boolean fields
                                elif isinstance(val, str) and val.lower() in ('true', 'false'):
                                    processed_row.append(val.lower() == 'true')
                                # Handle NaN values
                                elif pd.isna(val):
                                    processed_row.append(None)
                                else:
                                    processed_row.append(val)
                            
                            # Create a tuple of processed values
                            row_data = tuple(processed_row)
                            
                            # Execute the SQL with the row data
                            cursor.execute("SAVEPOINT before_insert")
                            cursor.execute(insert_sql, row_data)
                            successful_inserts += 1
                        except Exception as insert_error:
                            cursor.execute("ROLLBACK TO SAVEPOINT before_insert")
                            failed_inserts += 1
                            print(f"[red]Error inserting row: {insert_error}")
                            print(f"[red]Row data: {row_data}")
                    
                    # Commit the transaction
                    conn.commit()
                
                print(f"[green]Table {table}: {successful_inserts} rows inserted successfully, {failed_inserts} rows failed.")
                
            except Exception as e:
                print(f"[red]Error processing table {table}: {str(e)}")
        
        # Close the connection
        conn.close()
        return True
        
    except Exception as e:
        print(f"[red]Error loading scenario: {str(e)}")
        return False

if __name__ == "__main__":
    # This can be run independently for testing purposes
    import argparse
    parser = argparse.ArgumentParser(description='Load a database scenario')
    parser.add_argument('scenario_path', help='Path to the scenario directory')
    args = parser.parse_args()
    
    # Find which tables have CSV files
    tables = []
    for file in os.listdir(args.scenario_path):
        if file.endswith('_data.csv'):
            table_name = file[:-9]  # Remove the _data.csv suffix
            tables.append(table_name)
    
    scenario_config = {
        "scenario_path": args.scenario_path,
        "tables": tables
    }
    
    main(scenario_config)