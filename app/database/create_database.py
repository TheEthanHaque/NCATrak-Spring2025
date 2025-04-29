import sys
import os
import psycopg2
from psycopg2 import sql, OperationalError, errors

def create(data):
    """
    data is [ host, database, user, password ]
    Expects superuser password in PGPASSWORD env var.
    """

    host, new_db, new_user, new_pass = data

    # Superuser creds (pg should pick up PGPASSWORD)
    superuser = "ethan"
    superpass = "securepassword"
    #if not superpass:
        #print("ERROR: Please set PGPASSWORD to your Postgres superuser password.")
        #sys.exit(1)

    # Phase 1: CREATE DATABASE if it doesn't exist
    try:
        with psycopg2.connect(
            host     = host,
            port     = 5432,
            dbname   = "postgres",
            user     = superuser,
            password = superpass
        ) as super_conn:
            super_conn.autocommit = True
            with super_conn.cursor() as cur:
                # Check existence
                cur.execute(
                    "SELECT 1 FROM pg_database WHERE datname = %s",
                    (new_db,)
                )
                if cur.fetchone():
                    print(f"• Database '{new_db}' already exists, skipping creation.")
                else:
                    cur.execute(
                        sql.SQL("CREATE DATABASE {}").format(
                            sql.Identifier(new_db)
                        )
                    )
                    print(f"✔ Created database '{new_db}'")
    except OperationalError as e:
        print("ERROR: could not connect as superuser:", e)
        sys.exit(1)
    except Exception as e:
        print("ERROR during database creation:", e)
        sys.exit(1)

    # Phase 2: Connect as the new user and run your schema-init SQL
    try:
        with psycopg2.connect(
            host     = host,
            port     = 5432,
            dbname   = new_db,
            user     = new_user,
            password = new_pass
        ) as conn:
            with conn.cursor() as cur:
                # ← Replace this with your actual schema setup:
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS example (
                        id   SERIAL PRIMARY KEY,
                        name TEXT NOT NULL
                    );
                """)
                conn.commit()
        print(f"✔ Schema initialized in '{new_db}' as user '{new_user}'.")
    except OperationalError as e:
        print(f"ERROR: could not connect to '{new_db}' as '{new_user}':", e)
        sys.exit(1)
    except Exception as e:
        print("ERROR during schema setup:", e)
        sys.exit(1)

def main(data):
    create(data)
