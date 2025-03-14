import psycopg2
from psycopg2 import sql
import os, platform

def create_user(data):
    curr_host = data[0]
    new_database = data[1]
    new_user = data[2]
    new_pass = data[3]
    super_user = os.getenv('USER') if platform.system() in ['Linux', 'Darwin'] else os.getenv('USERNAME') if platform.system() == 'Windows' else None
    
    print(f"Creating user {new_user} and granting permissions...")
    
    # Connection for user creation (connect as superuser to postgres database)
    try:
        # First connect to postgres database to create user
        connection_postgres = psycopg2.connect(
            dbname="postgres",  
            user=super_user,  
            password="",  
            host=curr_host,
            port="5432"
        )
        connection_postgres.autocommit = True
        cursor_postgres = connection_postgres.cursor()

        # Check if user already exists
        cursor_postgres.execute("SELECT 1 FROM pg_roles WHERE rolname = %s", [new_user])
        user_exists = cursor_postgres.fetchone()
        
        if not user_exists:
            print(f"Creating user {new_user}...")
            # Create the new user
            create_user_query = sql.SQL("CREATE USER {} WITH PASSWORD %s").format(sql.Identifier(new_user))
            cursor_postgres.execute(create_user_query, [new_pass])
            print(f"User {new_user} created successfully")
        else:
            print(f"User {new_user} already exists")

        # Grant createdb privilege to the user
        alter_role_query = sql.SQL("ALTER ROLE {} CREATEDB").format(sql.Identifier(new_user))
        cursor_postgres.execute(alter_role_query)
        print(f"CREATEDB privilege granted to {new_user}")
        
        # Grant connection privileges to the database
        cursor_postgres.execute(
            sql.SQL("GRANT CONNECT ON DATABASE {} TO {}").format(
                sql.Identifier(new_database),
                sql.Identifier(new_user)
            )
        )
        print(f"Connection privileges to {new_database} granted to {new_user}")
        
        # Close connection to postgres database
        cursor_postgres.close()
        connection_postgres.close()
        
        # Now connect to the specific database to grant table privileges
        connection = psycopg2.connect(
            dbname=new_database,  
            user=super_user,  
            password="",  
            host=curr_host,
            port="5432"
        )
        connection.autocommit = True
        cursor = connection.cursor()
        
        # Grant schema usage
        cursor.execute(
            sql.SQL("GRANT USAGE ON SCHEMA public TO {}").format(
                sql.Identifier(new_user)
            )
        )
        print("Schema usage privileges granted")
        
        # Grant privileges on all tables
        cursor.execute(
            sql.SQL("GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO {}").format(
                sql.Identifier(new_user)
            )
        )
        print("Table privileges granted")
        
        # Grant privileges on all sequences
        cursor.execute(
            sql.SQL("GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO {}").format(
                sql.Identifier(new_user)
            )
        )
        print("Sequence privileges granted")
        
        # Set default privileges for future tables
        cursor.execute(
            sql.SQL("ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO {}").format(
                sql.Identifier(new_user)
            )
        )
        print("Default privileges set for future tables")
        
        # Set default privileges for future sequences
        cursor.execute(
            sql.SQL("ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO {}").format(
                sql.Identifier(new_user)
            )
        )
        print("Default privileges set for future sequences")
        
        print(f"All necessary permissions have been granted to user {new_user}")
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        # Close the connections
        if 'cursor' in locals() and cursor:
            cursor.close()
        if 'connection' in locals() and connection:
            connection.close()
        if 'cursor_postgres' in locals() and cursor_postgres:
            cursor_postgres.close()
        if 'connection_postgres' in locals() and connection_postgres:
            connection_postgres.close()

# Run the function to create the user and grant permissions
def main(data):
    create_user(data)
