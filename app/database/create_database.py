import psycopg2
from psycopg2 import sql, OperationalError
import os, platform

def create(data):
    curr_host = data[0]
    new_database = data[1]
    new_user = data[2]
    new_pass = data[3]
    super_user = os.getenv('USER') if platform.system() in ['Linux', 'Darwin'] else os.getenv('USERNAME') if platform.system() == 'Windows' else None


    try:
        # Connect to the PostgreSQL server (connecting to 'postgres' database)
        connection = psycopg2.connect(
            dbname="postgres",  # Default database for administrative tasks
            user=super_user,
            password="",
            host=curr_host,
            port="5432"
        )

        # Set autocommit mode so that the CREATE DATABASE command runs outside of a transaction
        connection.autocommit = True

        # Create a cursor
        cursor = connection.cursor()

        # SQL query to create a new database
        create_db_query = sql.SQL("CREATE DATABASE {}").format(sql.Identifier(new_database))

        # Execute the query
        cursor.execute(create_db_query)

    except OperationalError as e:
        print(f"Error: {e}")
    finally:
        # Close the cursor and the connection
        if connection:
            cursor.close()
            connection.close()

# Call the function to create a new database
def main(data):
    create(data)
