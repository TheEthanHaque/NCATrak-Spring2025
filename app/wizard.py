import os

from rich import print
from rich.prompt import Prompt

from database.create_tables import main as create_tables
from database.create_database import main as create_database
from database.create_user import main as create_user
from database.populate_database import main as populate_database
from generator.data_generator import run_generator_menu, create_scenario

db_tables = [
    "state",
    "child_advocacy_center",
    "cac_agency",
    "employee",
    "employee_account",
    "person",
    "cac_case",
    "case_person",
    "case_va_session_log",
    "case_va_session_attendee",
    "case_va_session_service",
    "case_mh_session_log_enc",
    "case_mh_session_attendee",
    "case_mh_session_attribute_group",
    "case_mh_assessment_instrument",
    "case_mh_assessment",
    "case_mh_assessment_measure_scores",
    "case_mh_assessment_diagnosis",
    "case_mh_treatment_models",
    "case_mh_treatment_plans",
    "case_mh_provider",
    "case_mh_service_barriers"
]

def list_scenarios():
    """
    List all available scenarios and let the user select one.
    """
    cwd = os.path.dirname(os.path.abspath(__file__))
    scenarios_dir = os.path.join(cwd, "scenarios")
    
    # Create scenarios directory if it doesn't exist
    if not os.path.exists(scenarios_dir):
        os.makedirs(scenarios_dir)
        print("[yellow]No scenarios found. Please add scenario folders to the 'scenarios' directory.")
        return None
    
    # Get list of scenario directories
    scenarios = [d for d in os.listdir(scenarios_dir) 
                if os.path.isdir(os.path.join(scenarios_dir, d))]
    
    if not scenarios:
        print("[yellow]No scenarios found. Please add scenario folders to the 'scenarios' directory.")
        return None
    
    print("[yellow]Available scenarios:")
    for i, scenario in enumerate(scenarios, 1):
        # Check if scenario has a description file
        desc_file = os.path.join(scenarios_dir, scenario, "description.txt")
        description = ""
        if os.path.exists(desc_file):
            with open(desc_file, 'r') as f:
                description = f" - " + f.read().strip()
                
        print(f"[white][{i}] {scenario}{description}")
    
    while True:
        selection = input("Select a scenario (number): ")
        if selection.isdigit() and 0 < int(selection) <= len(scenarios):
            return scenarios[int(selection) - 1]
        else:
            print("[red]Invalid selection. Please enter a valid number.")

def load_scenario(scenario_name):
    """
    Load a predefined scenario into the database.
    """
    try:
        # Path to the scenario data
        cwd = os.path.dirname(os.path.abspath(__file__))
        scenario_path = os.path.join(cwd, "scenarios", scenario_name)
        
        if not os.path.exists(scenario_path):
            print(f"[red]Error: Scenario '{scenario_name}' not found.")
            return False
        
        print(f"[yellow]Loading scenario '{scenario_name}'...")
        
        # Create an empty config file that we'll pass to populate_database
        scenario_config = {
            "scenario_path": scenario_path,
            "tables": []
        }
        
        # Check which tables have data in this scenario
        for table in db_tables:
            csv_file = os.path.join(scenario_path, f"{table}_data.csv")
            if os.path.exists(csv_file):
                scenario_config["tables"].append(table)
                print(f"[green]Found data for table '{table}'")
                
        if not scenario_config["tables"]:
            print("[red]No data files found in this scenario.")
            return False
            
        # Call populate_database with the scenario config
        from database.populate_scenario import main as populate_scenario
        populate_scenario(scenario_config)
        
        print(f"[green]Successfully loaded scenario '{scenario_name}'.")
        return True
    
    except Exception as e:
        print(f"[red]Error loading scenario: {str(e)}")
        return False

def save_scenario_from_generator():
    """
    Create a new scenario from generated data.
    This is different from the data_generator's scenario creation in that
    it assumes data has already been generated.
    """
    scenario_name = Prompt.ask("[yellow]Enter a name for the new scenario")
    result = create_scenario(scenario_name)
    if result:
        print(f"[green]Scenario '{scenario_name}' has been created successfully.")
    else:
        print("[red]Failed to create scenario.")

if __name__ == "__main__":
    print('''
[bold blue]WELCOME TO THE NCA-TRAK SETUP WIZARD\n
If you haven't yet, please read the [red]README.MD [blue]file in the home directory.
[bold red]IT IS VITAL YOU HAVE THE REQUIREMENTS INSTALLED BEFORE PROCEEDING

[yellow]Please Select From the following options:
[white]
[1] Complete Install
[2] Add New Generated Data
[3] Load Predefined Scenario
[4] Save Current Data as Scenario
''')

    while True:
        n = input()
        if not (n.isdigit() and 4 >= int(n) > 0):
            print("[red]Please insert a number from the options listed.")
        else:
            break
    n = int(n)

    if n == 1:
        cwd = os.path.dirname(os.path.abspath(__file__))
        database_ini_path = os.path.join(cwd, "database", "database.ini")
        with open(database_ini_path, "w") as file:
            file.write("[postgresql]\n")
            data = {
                "host": Prompt.ask("[yellow]Enter the host\n"), 
                "database": Prompt.ask("[yellow]Enter the database name\n"),
                "username": Prompt.ask("[yellow]Enter user name\n"),
                "password": Prompt.ask("[yellow]Enter password\n")}
            file.write(f"host={data['host']}\ndatabase={data['database']}\nuser={data['username']}\npassword={data['password']}")
        print("[green]Database.ini file has been created.")
        env_file_path = os.path.join(cwd, "api", ".env")
        with open(env_file_path, "w") as env_file:
            env_file.write(f'DATABASE_URL="postgresql://{data['username']}:{data['password']}@{data['host']}:5432/{data['database']}?schema=public"')
        print("[green].env file has been created.")
        create_database([data["host"], data["database"], data["username"], data["password"]])
        print(f"[green]The database \"{data['database']}\" has been created.")
        create_user([data["host"], data["database"], data["username"], data["password"]])
        print(f"[green]The user \"{data['username']}\" has been created for the database \"{data['database']}\".")
        create_tables()
        print("[green]Database tables created.")
        run_generator_menu()
        print("[green]Database tables generated.")
        populate_database()
        print("[green]Database tables populated.")
        print("[green][bold]Installation complete. Database has been populated.")

    # Add New Generated Data
    elif n == 2:
        print("[green]Database tables created.")
        run_generator_menu()
        print("[green]Database tables generated.")
        populate_database()
        print("[bold green]Additional data added.")
        
    # Load a predefined scenario
    elif n == 3:
        # First, ask about database connection if needed
        if not os.path.exists(os.path.join(os.path.dirname(os.path.abspath(__file__)), "database", "database.ini")):
            cwd = os.path.dirname(os.path.abspath(__file__))
            database_ini_path = os.path.join(cwd, "database", "database.ini")
            with open(database_ini_path, "w") as file:
                file.write("[postgresql]\n")
                data = [Prompt.ask("[yellow]Enter the host\n"), Prompt.ask("[yellow]Enter the database name\n"),
                        Prompt.ask("[yellow]Enter user name\n"),
                        Prompt.ask("[yellow]Enter password\n")]
                file.write(f"host={data[0]}\ndatabase={data[1]}\nuser={data[2]}\npassword={data[3]}")
            print("[green]Database.ini file has been created.")
            env_file_path = os.path.join(cwd, "api", ".env")
            with open(env_file_path, "w") as env_file:
                env_file.write(f'DATABASE_URL="postgresql://{data[2]}:{data[3]}@{data[0]}:5432/{data[1]}?schema=public"')
            print("[green].env file has been created.")
        
        print("[yellow]Loading a predefined scenario will clear existing data in the database.")
        confirm = Prompt.ask("[yellow]Do you want to continue?", choices=["y", "n"], default="y")
        
        if confirm.lower() == "y":
            # Select and load a scenario
            scenario_name = list_scenarios()
            if scenario_name:
                create_tables()  # Create empty tables first to ensure clean state
                if load_scenario(scenario_name):
                    print(f"[bold green]Scenario '{scenario_name}' has been loaded successfully.")
                else:
                    print(f"[bold red]Failed to load scenario '{scenario_name}'.")
                    
    # Save current data as scenario
    elif n == 4:
        # Check if csvs directory exists (indicating data has been generated)
        generator_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "generator", "csvs")
        if not os.path.exists(generator_dir) or not os.listdir(generator_dir):
            print("[red]No generated data found. Please generate data first using option 2.")
        else:
            save_scenario_from_generator()