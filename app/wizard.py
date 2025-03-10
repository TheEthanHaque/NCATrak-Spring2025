import os

from rich import print
from rich.prompt import Prompt

from database.create_tables import main as create_tables
from database.populate_database import main as populate_database
from generator.data_generator import main as data_generator

db_tables = [
    "state",
    "child_advocacy_center",
    "cac_agency",
    "employee",
    "employee_account",
    "person",
    "cac_case",
    "case_person",
    "case_va_session",
    "case_va_session_attendee",
    "case_va_session_service",
    "case_mh_session",
    "case_mh_session_attendee",
    "case_mh_session_attribute_group",
    "case_mh_assessment_instrument",
    "case_mh_assessment",
    "case_mh_assessment_measure_scores",
    "case_mh_assessment_diagnosis",
    "case_mh_treatment_model",
    "case_mh_treatment_plan",
    "case_mh_provider",
    "case_mh_service_barriers"
]

if __name__ == "__main__":
    print('''
[bold blue]WELCOME TO THE NCA-TRAK SETUP WIZARD\n
If you haven't yet, please read the [red]README.MD [blue]file in the home directory.
[bold red]IT IS VITAL YOU HAVE THE REQUIREMENTS INSTALLED BEFORE PROCEEDING

[yellow]Please Select From the following options:
[white]
[1] Complete Install
[2] Added New Generated Data
''')

while True:
    n = input()
    if not (n.isdigit() and 2 >= int(n) > 0):
        print("[red]Please insert a number from the options listed.")
    else:
        break
n = int(n)

if n == 1:
    cwd = os.path.dirname(os.path.abspath(__file__))
    database_ini_path = os.path.join(cwd, "database", "database.ini")
    with open(database_ini_path, "w") as file:
        file.write("[postgresql]\n")
        data = [Prompt.ask("[yellow]Enter the host\n"), Prompt.ask("[yellow]Enter the database name\n"),
                Prompt.ask("[yellow]Enter user name\n"),
                Prompt.ask("[yellow]Enter password\n")]
        file.write(f"host={data[0]}\ndatabase={data[1]}\nuser={data[2]}\npassword={data[3]}")
    print("[green]Database.ini file has been created.")
    create_tables()
    print("[green]Database tables created.")
    data_generator()
    print("[green]Database tables generated.")
    populate_database()
    print("[green]Database tables populated.")
    print("[green][bold]Installation complete. Please run app.py to use the program.")

# Add New Generated Data
elif n == 2:
    print("[green]Database tables created.")
    data_generator()
    print("[green]Database tables generated.")
    populate_database()
    print("[bold green]Additional data added.")
