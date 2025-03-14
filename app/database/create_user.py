import psycopg2
from psycopg2 import sql
import os, platform

def create_user(data):
    curr_host = data[0]
    new_database = data[1]
    new_user = data[2]
    new_pass = data[3]
    super_user = os.getenv('USER') if platform.system() in ['Linux', 'Darwin'] else os.getenv('USERNAME') if platform.system() == 'Windows' else None
    try:
        # Connect to the PostgreSQL server (assuming you're connected to the 'postgres' database)
        connection = psycopg2.connect(
            dbname=new_database,  
            user=super_user,  
            password="",  
            host=curr_host,
            port="5432"
        )

        # Create a cursor object
        cursor = connection.cursor()

        # Create the new user
        create_user_query = sql.SQL("CREATE USER {} WITH PASSWORD %s").format(sql.Identifier(new_user))
        cursor.execute(create_user_query, [new_pass])

        # Grant CREATEDB privilege to the user
        alter_role_query = sql.SQL("ALTER ROLE {} CREATEDB").format(sql.Identifier(new_user))
        cursor.execute(alter_role_query)

        # Commit changes
        connection.commit()

    except Exception as e:
        print(f"Error: {e}")

    finally:
        # Close the cursor and the connection
        if connection:
            cursor.close()
            connection.close()

# Run the function to create the user
def main(data):
    create_user(data)
