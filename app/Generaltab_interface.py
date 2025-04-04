import tkinter as tk
from tkinter import ttk
from tkinter import filedialog, messagebox
from tkcalendar import DateEntry
import MH_basic_interface
import people_interface
import MH_assessment
import MH_treatmentPlan_interface
import va_tab_interface
import case_notes
import database_lookup_search
from database.config import load_config
from database.connect import connect
import psycopg2
import random


class GeneraltabInterface(tk.Frame):

    def __init__(self, parent, controller):

        self.controller = controller

        tk.Frame.__init__(self, parent)

        def get_default_case():
            try:
                config = load_config()
                with psycopg2.connect(**config) as conn:
                    with conn.cursor() as cur:
                        cur.execute("select * from cac_case limit 1;")
                        case = cur.fetchone()
                        return case
            except (psycopg2.DatabaseError, Exception) as error:
                print(f"{error}")

        def get_case(id):
            try:
                config = load_config()
                with psycopg2.connect(**config) as conn:
                    with conn.cursor() as cur:
                        cur.execute("select * from cac_case where case_id = %s;", (id,))
                        case = cur.fetchone()
                        return case
            except (psycopg2.DatabaseError, Exception) as error:
                print(f"{error}")

        with open("case_id.txt", "r") as file:
            case = get_case(file.read())

        if case is None:
            case = get_default_case()

        cacId = case[0]
        caseId = case[1]
        caseNumber = case[2]
        caseReceivedDate = case[3]
        caseClosedDate = case[4]
        caseClosedReasonId = case[5]
        caseCreatedDate = case[6]
        leadEmployeeId = case[7]
        vaAgencyId = case[19]
        vaCaseNumber = case[20]
        claimDeniedReason = case[21]
        claimNumber = case[22]
        claimStatusId = case[23]
        hasBirthCert = case[24]
        hasPoliceReport = case[25]
        mdtReady = case[26]
        vaNa = case[27]
        referralAgencyId = case[28]
        referralDate = case[29]
        servicesAccepted = case[30]
        servicesOfferedDate = case[31]
        servicesEndDate = case[32]

        self.grid_rowconfigure(0, weight=1)
        self.grid_columnconfigure(0, weight=1)

        # Create a canvas and a scrollbar
        canvas = tk.Canvas(self)
        scrollbar = ttk.Scrollbar(self, orient="vertical", command=canvas.yview)
        scrollable_frame = ttk.Frame(canvas)

        # Configure the canvas and scrollbar
        scrollable_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
        )

        # Window in the canvas
        canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")

        # Scrollbar to canvas
        canvas.configure(yscrollcommand=scrollbar.set)

        # Use grid over pack for interface linking
        canvas.grid(row=0, column=0, sticky="nsew")
        scrollbar.grid(row=0, column=1, sticky="ns")

        # Navigation Buttons
        button_frame = ttk.Frame(scrollable_frame)
        button_frame.grid(row=0, column=0, columnspan=7, padx=5, pady=5, sticky='w')

        # Create a list of tuples with button text and corresponding function placeholders
        nav_buttons = [
            ("Lookup", self.show_lookup_tab),
            ("General", self.show_general_tab),
            ("People", self.show_people_tab),
            ("Mental Health - Basic", self.show_mh_basic),
            ("Mental Health - Assessment", self.show_mh_assessment),
            ("Mental Health - Treatment Plan", self.show_mh_treatment_plan),
            ("Mental Health - Case Notes", self.show_case_notes),
            ("VA", self.show_va_tab),
        ]

        for btn_text, btn_command in nav_buttons:
            button = ttk.Button(button_frame, text=btn_text, command=btn_command)
            button.pack(side='left', padx=5)

        # Reload button - fully reloads the application
        refresh_button = ttk.Button(button_frame, text="Reload", command=controller.refresh)
        refresh_button.pack(side='right', padx=5)

        # Display current case ID
        current_case_id_file = open("case_id.txt", "r")
        current_case_id = int(current_case_id_file.readline())
        current_case_id_file.close()
        case_id_font = ("Helvetica", 10)
        tk.Label(button_frame, text=f"Case ID: {current_case_id}", font=case_id_font).pack(side='right', padx=30)

        widget_frame = ttk.Frame(scrollable_frame)
        widget_frame.grid(row=1, column=0, pady=20)

        def get_all_cases():
            try:
                config = load_config()
                with psycopg2.connect(**config) as conn:
                    with conn.cursor() as cur:
                        cur.execute("""select cac_case.mh_referral_date, cac_agency.agency_name, employee.first_name, employee.last_name,   
                                    from cac_case;""")
                        cases = cur.fetchall()
                        return cases
            except (psycopg2.DatabaseError, Exception) as error:
                print(f"{error}")

        # Function to create edit case details
        def add_editbutton_popup():
            popup = tk.Toplevel(self)
            popup.title("Edit")
            popup.geometry("500x400")

            ttk.Label(popup, text="Service", foreground='black').grid(row=1, column=0, padx=5, pady=5)
            service_name = ttk.Label(popup, text="LI")
            service_name.grid(row=1, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Referral Date", foreground='black').grid(row=2, column=0, padx=5, pady=5)
            referral_date_entry = DateEntry(popup, width=12, background='darkblue', foreground='white', borderwidth=2)
            referral_date_entry.grid(row=2, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Referred By", foreground='black').grid(row=3, column=0, padx=5, pady=5)
            referral_group_entry = ttk.Combobox(popup)
            referral_group_entry.grid(row=3, column=1, padx=5, pady=5)
            referral_worker_entry = ttk.Combobox(popup)
            referral_worker_entry.grid(row=3, column=2, padx=5, pady=5)

            ttk.Label(popup, text="Providing Agency").grid(row=4, column=0, padx=5, pady=5)
            providing_agency_entry = ttk.Combobox(popup)
            providing_agency_entry.grid(row=4, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Primary Contact").grid(row=5, column=0, padx=5, pady=5)
            primary_contact_entry = ttk.Combobox(popup)
            primary_contact_entry.grid(row=5, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Status").grid(row=6, column=0, padx=5, pady=5)
            status_entry = ttk.Label(popup, text="Referred")
            status_entry.grid(row=6, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Status Date").grid(row=7, column=0, padx=5, pady=5)
            status_date_entry = ttk.Label(popup, text="08/25/2021")
            status_date_entry.grid(row=7, column=1, padx=5, pady=5)

            # Update and Cancel buttons
            ttk.Button(popup, text="Update", command=lambda: [popup.destroy()]).grid(row=9, column=0, padx=5, pady=5)
            ttk.Button(popup, text="Cancel", command=lambda: [popup.destroy()]).grid(row=9, column=1, padx=5, pady=5)

        def add_allegation_record_popup():
            popup = tk.Toplevel(self)
            popup.title("Edit")
            popup.geometry("300x200")

            ttk.Label(popup, text="CAC Case Number", foreground='black').grid(row=2, column=0, padx=5, pady=5)
            case_number_entry = ttk.Entry(popup)
            case_number_entry.grid(row=2, column=1, padx=5, pady=5)

            # Update and Cancel buttons
            ttk.Button(popup, text="Update", command=lambda: [popup.destroy()]).grid(row=9, column=0, padx=5, pady=5)
            ttk.Button(popup, text="Cancel", command=lambda: [popup.destroy()]).grid(row=9, column=1, padx=5, pady=5)

        def add_information_record_popup():
            popup = tk.Toplevel(self)
            popup.title("")
            popup.geometry("600x500")

            twelve = tk.BooleanVar(value=False)

            # Entry fields for case details
            ttk.Label(popup, text="Requested Date", foreground='black').grid(row=2, column=0, padx=5, pady=5)
            requested_date_entry = DateEntry(popup, width=12, background='darkblue', foreground='white', borderwidth=2)
            requested_date_entry.grid(row=2, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Requested By", foreground='black').grid(row=3, column=0, padx=5, pady=5)
            requested_by_entry = ttk.Entry(popup)
            requested_by_entry.grid(row=3, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Is this a request by subpoena?", foreground='black').grid(row=4, column=0, padx=5,
                                                                                             pady=5)
            check_box = ttk.Checkbutton(popup, text="Yes", variable=twelve)
            check_box.grid(row=4, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Who authorized release?").grid(row=5, column=0, padx=5, pady=5)
            who_authorized_entry = ttk.Entry(popup)
            who_authorized_entry.grid(row=5, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Who released the records?").grid(row=6, column=0, padx=5, pady=5)
            who_released_entry = ttk.Entry(popup)
            who_released_entry.grid(row=6, column=1, padx=5, pady=5)

            ttk.Label(popup, text="What records were released?").grid(row=7, column=0, padx=5, pady=5)
            what_records_entry = ttk.Entry(popup)
            what_records_entry.grid(row=7, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Date Released").grid(row=8, column=0, padx=5, pady=5)
            date_released_entry = DateEntry(popup, width=12, background='darkblue', foreground='white', borderwidth=2)
            date_released_entry.grid(row=8, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Date to be returned (if applicable)").grid(row=9, column=0, padx=5, pady=5)
            tobe_returned_date_entry = DateEntry(popup, width=12, background='darkblue', foreground='white',
                                                 borderwidth=2)
            tobe_returned_date_entry.grid(row=9, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Date Returned").grid(row=10, column=0, padx=5, pady=5)
            returned_date_entry = DateEntry(popup, width=12, background='darkblue', foreground='white', borderwidth=2)
            returned_date_entry.grid(row=10, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Testing field 1").grid(row=11, column=0, padx=5, pady=5)
            testing_field1_entry = ttk.Entry(popup)
            testing_field1_entry.grid(row=11, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Testing field 2").grid(row=12, column=0, padx=5, pady=5)
            testing_field2_entry = ttk.Entry(popup)
            testing_field2_entry.grid(row=12, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Name and Address").grid(row=13, column=0, padx=5, pady=5)
            name_address_entry = ttk.Entry(popup)
            name_address_entry.grid(row=13, column=1, padx=5, pady=5)

            # Update and Cancel buttons
            ttk.Button(popup, text="Save", command=lambda: [popup.destroy()]).grid(row=14, column=0, padx=5, pady=5)
            ttk.Button(popup, text="Cancel", command=lambda: [popup.destroy()]).grid(row=14, column=1, padx=5, pady=5)

        # Create the cases section
        cases_frame = tk.LabelFrame(scrollable_frame, text="Cases", padx=10, pady=10)
        cases_frame.grid(row=2, column=0, padx=5, pady=5, sticky='w')

        # Date (with DateEntry for calendar selection)
        ttk.Label(cases_frame, text="Service").grid(row=0, column=1, padx=5, pady=5)

        ttk.Label(cases_frame, text="Referral Date").grid(row=0, column=2, sticky="w")

        ttk.Label(cases_frame, text="Referred By").grid(row=0, column=3, padx=5, pady=5)

        ttk.Label(cases_frame, text="Providing Agency").grid(row=0, column=4, padx=5, pady=5)

        ttk.Label(cases_frame, text="Primary Contact").grid(row=0, column=5, padx=5, pady=5)

        ttk.Label(cases_frame, text="Status").grid(row=0, column=6, padx=5, pady=5)

        ttk.Label(cases_frame, text="Status Date").grid(row=0, column=7, padx=5, pady=5)

        def load_general_case(frame=None, caseid=None):
            try:
                if caseid is None:
                    raise ValueError("A case ID must be provided.")

                config = load_config()
                with psycopg2.connect(**config) as conn:
                    with conn.cursor() as cur:
                        cur.execute("SELECT * FROM case_mh_provider WHERE case_id = %s", (caseid,))
                        cases = cur.fetchall()

                        cur.execute("SELECT * FROM case_va_session_attendee WHERE case_id = %s", (caseid,))
                        va_cases = cur.fetchall()
            except (psycopg2.DatabaseError, Exception) as error:
                print(f"Error: {error}")
                ttk.Label(frame, text="An error occurred while fetching data.").grid(row=0, column=0, columnspan=7,
                                                                                     pady=10)
                return

            # Check if no data exists
            if not cases and not va_cases:
                ttk.Label(frame, text="No case found with the provided ID.").grid(row=1, column=0, columnspan=7,
                                                                                  pady=10)
                return
            row_counter = 1

            for case in cases:
                labels_data = {
                    "Service Field": "MH",
                    "Referral Date": "",
                    "Referred By": "",
                    "Providing Agency": "",
                    "Primary Contact": "",
                    "Status": "",
                    "Status Date": ""
                }

                # Add labels dynamically
                for i, (label, value) in enumerate(labels_data.items(), start=1):
                    ttk.Label(frame, text=value).grid(row=row_counter, column=i, padx=5, pady=5)

                # Add Edit button
                ttk.Button(frame, text="Edit", command=add_editbutton_popup).grid(row=row_counter, column=0, padx=5,
                                                                                  pady=5)
                row_counter += 1

            for case in va_cases:
                labels_data = {
                    "Service Field": "VA",
                    "Referral Date": "",  # Replace with correct index
                    "Referred By": "",  # Replace with correct index
                    "Providing Agency": "",  # Replace with correct index
                    "Primary Contact": "",  # Replace with correct index
                    "Status": "",  # Replace with correct index
                    "Status Date": "",  # Replace with correct index
                }

                # Add labels dynamically
                for i, (label, value) in enumerate(labels_data.items(), start=1):
                    ttk.Label(frame, text=value).grid(row=row_counter, column=i, padx=5, pady=5)

                # Add Edit button
                # ttk.Button(frame, text="Edit", command=add_editbutton_popup).grid(row=row_counter, column=0, padx=5,pady=5)
                row_counter += 1

        load_general_case(cases_frame, caseId)

        # ------------------------------

        def get_all_states():
            try:
                config = load_config()
                with psycopg2.connect(**config) as conn:
                    with conn.cursor() as cur:
                        cur.execute("select * from state_table;")
                        states = cur.fetchall()
                        stateMap = {state[1]: state[0] for state in states}
                        return stateMap
            except (psycopg2.DatabaseError, Exception) as error:
                print(f"{error}")

        def get_all_agencies():
            try:
                config = load_config()
                with psycopg2.connect(**config) as conn:
                    with conn.cursor() as cur:
                        cur.execute("select * from child_advocacy_center order by cac_name;")
                        agencies = cur.fetchall()
                        agencyMap = {agency[0]: agency[1] for agency in agencies}
                        agencyMapReversed = {agency[1]: agency[0] for agency in agencies}
                        return agencyMap, agencyMapReversed
            except (psycopg2.DatabaseError, Exception) as error:
                print(f"{error}")

        def insert_new_agency(name, address1, address2, city, state, zipcode, phone):
            sqlQuery = """insert into cac_agency (agency_id, cac_id, agency_name, addr_line_1, 
            addr_line_2, city, state_abbr, phone_number, zip_code)
            values (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
            try:
                config = load_config()
                with psycopg2.connect(**config) as conn:
                    with conn.cursor() as cur:
                        cur.execute(sqlQuery, (random.randint(1, 99999999), 1, name, address1, address2, city, state,
                                               phone, zipcode))
                        conn.commit
                        messagebox.showinfo("Save", "Agency has been saved successfully!")
            except (psycopg2.DatabaseError, Exception) as error:
                print(f"{error}")

        def add_agency_popup():
            popup = tk.Toplevel(self)
            popup.title("New Agency")
            popup.geometry("550x550")

            agencies, aReverse = get_all_agencies()

            states = get_all_states()

            popup.grid_columnconfigure(0, weight=1)
            popup.grid_columnconfigure(1, weight=1)
            popup.grid_rowconfigure(3, weight=1)

            ttk.Label(popup, text="Below is a list of existing agencies.", foreground='black').grid(row=0, column=0,
                                                                                                    padx=5, pady=5,
                                                                                                    sticky='w')
            ttk.Label(popup, text="If the desired agency is on this list do not add again.", foreground='black').grid(
                row=1, column=0, padx=5, pady=5, sticky='w')
            ttk.Label(popup,
                      text="If the agency is not on the list enter agency information into fields marked with (*) and click 'Save'.",
                      foreground='red').grid(row=2, column=0, padx=5, pady=5, sticky='w')

            listbox_frame = ttk.Frame(popup)
            listbox_frame.grid(row=3, column=0, padx=10, pady=10, sticky='w')

            # Add a scrollbar for the listbox
            scrollbar = ttk.Scrollbar(listbox_frame, orient="vertical")

            # Listbox with adjusted width and integrated scrollbar
            agency_listbox = tk.Listbox(listbox_frame, height=10, width=50, yscrollcommand=scrollbar.set)
            scrollbar.config(command=agency_listbox.yview)
            for agency_name in agencies.values():
                agency_listbox.insert(tk.END, agency_name)
            agency_listbox.grid(row=0, column=0, sticky='ns')
            scrollbar.grid(row=0, column=1, sticky='ns')

            field_frame = ttk.Frame(popup)
            field_frame.grid(row=5, column=0, padx=5, pady=5, sticky='w')

            fields = [
                ("Agency Name *", ttk.Entry),
                ("Address Line 1 *", ttk.Entry),
                ("Address Line 2", ttk.Entry),
                ("City *", ttk.Entry),
                ("State *", ttk.Combobox),
                ("Zip Code *", ttk.Entry),
                ("Phone Number *", ttk.Entry),
            ]

            entries = []
            for idx, (label_text, widget_type) in enumerate(fields):
                ttk.Label(field_frame, text=label_text, foreground='black').grid(row=idx, column=0, padx=5, pady=5,
                                                                                 sticky='w')
                if label_text == 'State *':
                    widget = widget_type(field_frame, values=list(states.values()))
                else:
                    widget = widget_type(field_frame)
                widget.grid(row=idx, column=1, padx=5, pady=5, sticky='w')
                entries.append(widget)

            button_frame = ttk.Frame(popup)
            button_frame.grid(row=6, column=0, padx=5, pady=5)

            # Update and Cancel buttons
            ttk.Button(button_frame, text="Save",
                       command=lambda: [insert_new_agency(entries[0].get(), entries[1].get(), entries[2].get(),
                                                          entries[3].get(), entries[4].get(), entries[5].get(),
                                                          entries[6].get()
                                                          ), popup.destroy()]).grid(row=14, column=0, padx=5, pady=5,
                                                                                    sticky='w')
            ttk.Button(button_frame, text="Cancel", command=lambda: [popup.destroy()]).grid(row=14, column=1, padx=5,
                                                                                            pady=5, sticky='w')

        def get_all_personnel():
            try:
                config = load_config()
                with psycopg2.connect(**config) as conn:
                    with conn.cursor() as cur:
                        cur.execute("select employee_id, first_name, last_name from employee order by last_name;")
                        personnel = cur.fetchall()
                        personMap = {person[0]: (person[1] + " " + person[2]) for person in personnel}
                        personMapReverse = {(person[1] + " " + person[2]): person[0] for person in personnel}
                        return personMap, personMapReverse
            except (psycopg2.DatabaseError, Exception) as error:
                print(f"{error}")

        def insert_new_personnel(email, first, last, title, number):
            # SQL query to insert a new employee
            sqlQuery = """insert into employee (employee_id, agency_id, cac_id, email_addr, 
            first_name, last_name, job_title, phone_number)
            values (%s, %s, %s, %s, %s, %s, %s, %s)"""
            getRandomAgencyIdQuery = """SELECT agency_id FROM cac_agency ORDER BY RANDOM() LIMIT 1"""
            getRandomCacIdQuery = """SELECT cac_id FROM cac_agency ORDER BY RANDOM() LIMIT 1"""

            try:
                config = load_config()
                with psycopg2.connect(**config) as conn:
                    with conn.cursor() as cur:
                        # Fetch a random agency_id
                        cur.execute(getRandomAgencyIdQuery)
                        random_agency_id = cur.fetchone()[0]

                        # Fetch random cac id
                        cur.execute(getRandomCacIdQuery)
                        random_cac_id = cur.fetchone()[0]

                        # Insert the new employee
                        cur.execute(sqlQuery, (
                            random.randint(1, 99999999),  # Random employee_id
                            random_agency_id,  # Random agency_id
                            random_cac_id,  # cac_id
                            email, first, last, title, number
                        ))

                        conn.commit()  # Commit the transaction
                        messagebox.showinfo("Save", "Person has been saved successfully!")
            except (psycopg2.DatabaseError, Exception) as error:
                print(f"Error: {error}")


        def add_personnel_popup():
            popup = tk.Toplevel(self)
            popup.title("New Personnel")
            popup.geometry("550x550")

            popup.grid_columnconfigure(0, weight=1)
            popup.grid_columnconfigure(1, weight=1)

            # existing personnel
            persons, pReverse = get_all_personnel()

            ttk.Label(popup, text="Below is a list of existing personnel.", foreground='black').grid(row=0, column=0,
                                                                                                     padx=5, pady=5,
                                                                                                     sticky='w')
            ttk.Label(popup, text="If the desired person is on this list, do not add again.", foreground='black').grid(
                row=1, column=0, padx=5, pady=5, sticky='w')
            ttk.Label(popup,
                      text="If the person is not on the list enter person information into fields marked with (*) and click 'Save'.",
                      foreground='red').grid(row=2, column=0, padx=5, pady=5, sticky='w')

            listbox_frame = ttk.Frame(popup)
            listbox_frame.grid(row=3, column=0, padx=10, pady=10, sticky='w')

            # Add a scrollbar for the listbox
            scrollbar = ttk.Scrollbar(listbox_frame, orient="vertical")

            # Listbox with adjusted width and integrated scrollbar
            personnel_listbox = tk.Listbox(listbox_frame, height=10, width=50, yscrollcommand=scrollbar.set)
            scrollbar.config(command=personnel_listbox.yview)
            for person in persons.values():
                personnel_listbox.insert(tk.END, person)
            personnel_listbox.grid(row=0, column=0, sticky='ns')
            scrollbar.grid(row=0, column=1, sticky='ns')

            field_frame = ttk.Frame(popup)
            field_frame.grid(row=5, column=0, padx=5, pady=5, sticky='w')

            fields = [
                ("First Name *", ttk.Entry),
                ("Last Name *", ttk.Entry),
                ("Preface", ttk.Entry),
                ("Credentials", ttk.Entry),
                ("Job title *", ttk.Entry),
                ("Email", ttk.Entry),
                ("Phone Number *", ttk.Entry),
            ]

            entries = []
            for idx, (label_text, widget_type) in enumerate(fields):
                ttk.Label(field_frame, text=label_text, foreground='black').grid(row=idx, column=0, padx=5, pady=5,
                                                                                 sticky='w')
                widget = widget_type(field_frame)
                widget.grid(row=idx, column=1, padx=5, pady=5, sticky='w')
                entries.append(widget)

            button_frame = ttk.Frame(popup)
            button_frame.grid(row=6, column=0, padx=5, pady=5)

            # Update and Cancel buttons
            ttk.Button(button_frame, text="Save", command=lambda: [
                insert_new_personnel(entries[5].get(), entries[0].get(), entries[1].get(), entries[4].get(),
                                     entries[6].get()), popup.destroy()]).grid(row=14, column=0, padx=5, pady=5)
            ttk.Button(button_frame, text="Cancel", command=lambda: [popup.destroy()]).grid(row=14, column=1, padx=5,
                                                                                            pady=5)

        # Case Information
        case_information_frame = tk.LabelFrame(scrollable_frame, text="Case Information", padx=10, pady=10)
        case_information_frame.grid(row=3, column=0, padx=5, pady=5, sticky='w')

        ttk.Label(case_information_frame, text="Date Received by CAC").grid(row=0, column=0, padx=5, pady=5)
        date_entry = DateEntry(case_information_frame, width=12, background='darkblue', foreground='white',
                               borderwidth=2)
        date_entry.grid(row=0, column=1, padx=5, pady=5)
        if caseReceivedDate is not None:
            date_entry.set_date(caseReceivedDate)

        agencies, aReverse = get_all_agencies()

        ttk.Label(case_information_frame, text="Main Agency Involved").grid(row=1, column=0, padx=5, pady=5)
        main_agency = ttk.Combobox(case_information_frame, values=list(agencies.values()))
        main_agency.grid(row=1, column=1, padx=5, pady=5)
        if cacId is not None:
            main_agency.set(agencies[cacId])

        add_agency = ttk.Button(case_information_frame, text="+ Add", command=add_agency_popup)
        add_agency.grid(row=1, column=2, padx=5, pady=5)

        personnel, pReverse = get_all_personnel()

        ttk.Label(case_information_frame, text="Main Personnel Involved").grid(row=2, column=0, padx=5, pady=5)
        main_personnel = ttk.Combobox(case_information_frame, values=list(personnel.values()))
        main_personnel.grid(row=2, column=1, padx=5, pady=5)
        if leadEmployeeId is not None:
            main_personnel.set(personnel[leadEmployeeId])

        add_personnel = ttk.Button(case_information_frame, text="+ Add", command=add_personnel_popup)
        add_personnel.grid(row=2, column=2, padx=5, pady=5)

        closeReasons = {
            1: "Administrative CLosure",
            2: "Client Moved",
            3: "All Investigations/Services Concluded",
            4: "False Report",
            5: "Client Refused Services",
            6: "Unfounded Report"
        }

        closeReasonsReverse = {
            "Administrative CLosure": 1,
            "Client Moved": 2,
            "All Investigations/Services Concluded": 3,
            "False Report": 4,
            "Client Refused Services": 5,
            "Unfounded Report": 6
        }

        ttk.Label(case_information_frame, text="Case Closed Reason").grid(row=3, column=0, padx=5, pady=5)
        close_reason = ttk.Combobox(case_information_frame, values=list(closeReasons.values()))
        close_reason.grid(row=3, column=1, padx=5, pady=5)
        if caseClosedReasonId is not None:
            close_reason.set(closeReasons[caseClosedReasonId])

        ttk.Label(case_information_frame, text="Case Close Date").grid(row=4, column=0, padx=5, pady=5)
        close_date = DateEntry(case_information_frame, width=12, background='darkblue', foreground='white',
                               borderwidth=2)
        close_date.grid(row=4, column=1, padx=5, pady=5)
        if caseClosedDate is not None:
            close_date.set_date(caseClosedDate)

        ttk.Label(case_information_frame, text="Survey Complete (1)").grid(row=5, column=0, padx=5, pady=5)
        survey_complete = ttk.Combobox(case_information_frame, values=["Yes", "No", "Family Assessment"])
        survey_complete.grid(row=5, column=1, padx=5, pady=5)

        ttk.Label(case_information_frame, text="Follow Up Survey Complete (2)").grid(row=6, column=0, padx=5, pady=5)
        followup_survey = ttk.Combobox(case_information_frame, values=["Yes", "No"])
        followup_survey.grid(row=6, column=1, padx=5, pady=5)

        ttk.Label(case_information_frame, text="CAC Case # (3)").grid(row=7, column=0, padx=5, pady=5)
        cac_casenum = ttk.Entry(case_information_frame)
        cac_casenum.grid(row=7, column=1, padx=5, pady=5)

        one = tk.BooleanVar(value=False)
        two = tk.BooleanVar(value=False)
        three = tk.BooleanVar(value=False)
        four = tk.BooleanVar(value=False)
        five = tk.BooleanVar(value=False)
        six = tk.BooleanVar(value=False)
        seven = tk.BooleanVar(value=False)
        eight = tk.BooleanVar(value=False)
        nine = tk.BooleanVar(value=False)
        ten = tk.BooleanVar(value=False)
        eleven = tk.BooleanVar(value=False)

        ttk.Label(case_information_frame, text="Did child go through the education program? (4)").grid(row=8, column=0,
                                                                                                       padx=2, pady=5)
        Yes = ttk.Checkbutton(case_information_frame, text="Yes", variable=one)
        Yes.grid(row=8, column=1, padx=5, pady=5)
        No = ttk.Checkbutton(case_information_frame, text="No", variable=two)
        No.grid(row=8, column=2, padx=5, pady=5)
        Not_Interested = ttk.Checkbutton(case_information_frame, text="Not Interested", variable=three)
        Not_Interested.grid(row=8, column=3, padx=5, pady=5)
        Maybe = ttk.Checkbutton(case_information_frame, text="Maybe", variable=four)
        Maybe.grid(row=9, column=1, padx=5, pady=5)
        sure = ttk.Checkbutton(case_information_frame, text="Not sure", variable=five)
        sure.grid(row=9, column=2, padx=5, pady=5)
        Interested = ttk.Checkbutton(case_information_frame, text="Interested", variable=six)
        Interested.grid(row=9, column=3, padx=5, pady=5)
        Denied = ttk.Checkbutton(case_information_frame, text="Denied", variable=seven)
        Denied.grid(row=10, column=1, padx=5, pady=5)

        ttk.Label(case_information_frame, text="Test 5").grid(row=11, column=0, padx=5, pady=5)
        test5 = ttk.Combobox(case_information_frame, values=["Yes", "No", "Pending", "N/A"])
        test5.grid(row=11, column=1, padx=5, pady=5)

        ttk.Label(case_information_frame, text="General - Custom Field 6").grid(row=12, column=0, padx=5, pady=5)
        custom_field6 = ttk.Entry(case_information_frame)
        custom_field6.grid(row=12, column=1, padx=5, pady=5)

        ttk.Label(case_information_frame, text="General - Custom Field 7").grid(row=13, column=0, padx=5, pady=5)
        custom_field7 = ttk.Entry(case_information_frame)
        custom_field7.grid(row=13, column=1, padx=5, pady=5)

        ttk.Label(case_information_frame, text="General - Custom Field 8").grid(row=14, column=0, padx=5, pady=5)
        custom_field8 = ttk.Entry(case_information_frame)
        custom_field8.grid(row=14, column=1, padx=5, pady=5)

        ttk.Label(case_information_frame, text="Chapter Test Field (9)").grid(row=15, column=0, padx=5, pady=5)
        testing = ttk.Checkbutton(case_information_frame, text="Testing", variable=nine)
        testing.grid(row=15, column=1, padx=5, pady=5)
        no_testing = ttk.Checkbutton(case_information_frame, text="No Testing", variable=ten)
        no_testing.grid(row=16, column=1, padx=5, pady=5)
        new_client = ttk.Checkbutton(case_information_frame, text="New Client", variable=eleven)
        new_client.grid(row=17, column=1, padx=5, pady=5)

        # ------------------------------

        # Linked Cases Services Section
        linked_cases_frame = tk.LabelFrame(scrollable_frame, text="Cases Linked to this Allegation", padx=10, pady=10)
        linked_cases_frame.grid(row=4, column=0, padx=5, pady=5, sticky='w')

        # CAC Case Number
        ttk.Label(linked_cases_frame, text="CAC Case Number").grid(row=1, column=6, padx=5, pady=5)
        case_number = ttk.Label(linked_cases_frame, text="Sample Case Number")
        case_number.grid(row=2, column=6, padx=5, pady=5)

        # Alleged Victim
        ttk.Label(linked_cases_frame, text="Alleged Victim").grid(row=1, column=7, padx=5, pady=5)
        alleged_victim = ttk.Label(linked_cases_frame, text="Sample Victim")
        alleged_victim.grid(row=2, column=7, padx=5, pady=5)

        # Add the "Edit" button
        ttk.Button(linked_cases_frame, text="Edit", command=add_editbutton_popup).grid(row=2, column=0, padx=5, pady=5)

        # Add the "Add new record" button
        ttk.Button(linked_cases_frame, text="Add new record", command=add_allegation_record_popup).grid(row=0, column=0,
                                                                                                        padx=5, pady=5)

        # --------------------------
        # -Court Activities Section
        court_activities_frame = tk.LabelFrame(scrollable_frame, text="Court Activities", padx=10, pady=10)
        court_activities_frame.grid(row=5, column=0, padx=5, pady=5, sticky='w')

        # Court Type
        ttk.Label(court_activities_frame, text="Court Type").grid(row=0, column=0, padx=5, pady=5)
        court_type = ttk.Combobox(court_activities_frame, values=["Type 1", "Type 2"])
        court_type.grid(row=1, column=0, padx=5, pady=5)

        # Court Date
        ttk.Label(court_activities_frame, text="Court Date").grid(row=0, column=1, padx=5, pady=5)
        court_date = DateEntry(court_activities_frame, width=12, background='darkblue', foreground='white',
                               borderwidth=2)
        court_date.grid(row=1, column=1, padx=5, pady=5)

        # --------------------------------
        # -Release of Information Section
        information_release_frame = tk.LabelFrame(scrollable_frame, text="Release of Information", padx=10, pady=10)
        information_release_frame.grid(row=6, column=0, padx=5, pady=5, sticky='w')

        ttk.Label(information_release_frame, text="Date Requested").grid(row=1, column=1, padx=5, pady=5)
        date_requested = DateEntry(information_release_frame, width=12, background='darkblue', foreground='white',
                                   borderwidth=2)
        date_requested.grid(row=2, column=1, padx=5, pady=5)

        ttk.Label(information_release_frame, text="Requested By").grid(row=1, column=2, padx=5, pady=5)
        requested_by = ttk.Combobox(information_release_frame, values=["Person 1", "Person 2"])
        requested_by.grid(row=2, column=2, padx=5, pady=5)

        ttk.Label(information_release_frame, text="By Subpoena").grid(row=1, column=3, padx=5, pady=5)
        by_subpeona = ttk.Combobox(information_release_frame, values=["Yes", "No"])
        by_subpeona.grid(row=2, column=3, padx=5, pady=5)

        ttk.Label(information_release_frame, text="Authorized By").grid(row=1, column=4, padx=5, pady=5)
        authorized_by = ttk.Combobox(information_release_frame, values=["Person 1", "Person 2"])
        authorized_by.grid(row=2, column=4, padx=5, pady=5)

        ttk.Label(information_release_frame, text="Released By").grid(row=1, column=5, padx=5, pady=5)
        released_by = ttk.Combobox(information_release_frame, values=["Person 1", "Person 2"])
        released_by.grid(row=2, column=5, padx=5, pady=5)

        ttk.Label(information_release_frame, text="Records").grid(row=1, column=6, padx=5, pady=5)
        records = ttk.Combobox(information_release_frame, values=["Record 1", "Record 2"])
        records.grid(row=2, column=6, padx=5, pady=5)

        ttk.Label(information_release_frame, text="Date Released").grid(row=1, column=7, padx=5, pady=5)
        date_released = DateEntry(information_release_frame, width=12, background='darkblue', foreground='white',
                                  borderwidth=2)
        date_released.grid(row=2, column=7, padx=5, pady=5)

        ttk.Label(information_release_frame, text="Date to be Returned").grid(row=1, column=8, padx=5, pady=5)
        tobe_returned = DateEntry(information_release_frame, width=12, background='darkblue', foreground='white',
                                  borderwidth=2)
        tobe_returned.grid(row=2, column=8, padx=5, pady=5)

        ttk.Label(information_release_frame, text="Date Returned").grid(row=1, column=9, padx=5, pady=5)
        date_returned = DateEntry(information_release_frame, width=12, background='darkblue', foreground='white',
                                  borderwidth=2)
        date_returned.grid(row=2, column=9, padx=5, pady=5)

        # Add the "Add new record" button
        ttk.Button(information_release_frame, text="Add new record", command=add_information_record_popup).grid(row=0,
                                                                                                                column=0,
                                                                                                                padx=5,
                                                                                                                pady=5)

        def add_referral_popup():
            # Create a new Toplevel window
            popup = tk.Toplevel(self)
            popup.title("Add Referral")
            popup.geometry("400x300")

            # Create labels and entry fields
            ttk.Label(popup, text="Referred From").grid(row=0, column=0, padx=5, pady=5)
            referral_from_entry = ttk.Entry(popup)
            referral_from_entry.grid(row=0, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Date").grid(row=1, column=0, padx=5, pady=5)
            referral_date_entry = DateEntry(popup, width=12, background='darkblue', foreground='white', borderwidth=2)
            referral_date_entry.grid(row=1, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Referred To").grid(row=2, column=0, padx=5, pady=5)
            referred_to_combo = ttk.Entry(popup)
            referred_to_combo.grid(row=2, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Comment").grid(row=3, column=0, padx=5, pady=5)
            comment_entry = ttk.Entry(popup)
            comment_entry.grid(row=3, column=1, padx=5, pady=5)

            # Update and Cancel buttons
            ttk.Button(popup, text="Update", command=popup.destroy).grid(row=4, column=0, padx=5, pady=5)
            ttk.Button(popup, text="Cancel", command=popup.destroy).grid(row=4, column=1, padx=5, pady=5)

        # Outside Referrals Section
        outside_referrals_frame = tk.LabelFrame(scrollable_frame, text="Outside Referrals", padx=10, pady=10)
        outside_referrals_frame.grid(row=7, column=0, padx=5, pady=5, sticky='w')

        ttk.Label(outside_referrals_frame, text="Referred From").grid(row=1, column=1, padx=5, pady=5)
        referral_from_entry = ttk.Entry(outside_referrals_frame)
        referral_from_entry.grid(row=2, column=1, padx=5, pady=5)

        ttk.Label(outside_referrals_frame, text="Referral Date").grid(row=1, column=2, padx=5, pady=5)
        referral_date_entry = DateEntry(outside_referrals_frame, width=12, background='darkblue', foreground='white',
                                        borderwidth=2)
        referral_date_entry.grid(row=2, column=2, padx=5, pady=5)

        ttk.Label(outside_referrals_frame, text="Referred To").grid(row=1, column=3, padx=5, pady=5)
        referral_to_entry = ttk.Entry(outside_referrals_frame)
        referral_to_entry.grid(row=2, column=3, padx=5, pady=5)

        ttk.Label(outside_referrals_frame, text="Comments").grid(row=1, column=4, padx=5, pady=5)
        comments_entry = ttk.Entry(outside_referrals_frame)
        comments_entry.grid(row=2, column=4, padx=5, pady=5)

        ttk.Button(outside_referrals_frame, text="Add New Referral", command=add_referral_popup).grid(row=0, column=0,
                                                                                                      padx=5, pady=5,
                                                                                                      sticky="w")

        # ----------------------
        # Insurance Information

        insurance_information_frame = tk.LabelFrame(scrollable_frame, text="Insurance Information", padx=10, pady=10)
        insurance_information_frame.grid(row=8, column=0, padx=5, pady=5, sticky='w')

        ttk.Label(insurance_information_frame, text="Primary Insurance").grid(row=0, column=1, padx=5, pady=5)
        ttk.Label(insurance_information_frame, text="Secondary Insurance").grid(row=0, column=2, padx=5, pady=5)

        ttk.Label(insurance_information_frame, text="Company").grid(row=1, column=0, padx=5, pady=5)
        company1 = ttk.Entry(insurance_information_frame, foreground='white')
        company1.grid(row=1, column=1, padx=5, pady=5)
        company2 = ttk.Entry(insurance_information_frame, foreground='white')
        company2.grid(row=1, column=2, padx=5, pady=5)

        ttk.Label(insurance_information_frame, text="Subscriber").grid(row=2, column=0, padx=5, pady=5)
        subscriber1 = ttk.Entry(insurance_information_frame)
        subscriber1.grid(row=2, column=1, padx=5, pady=5)
        subscriber2 = ttk.Entry(insurance_information_frame, foreground='white')
        subscriber2.grid(row=2, column=2, padx=5, pady=5)

        ttk.Label(insurance_information_frame, text="Policy Number").grid(row=3, column=0, padx=5, pady=5)
        policy1 = ttk.Entry(insurance_information_frame)
        policy1.grid(row=3, column=1, padx=5, pady=5)
        policy2 = ttk.Entry(insurance_information_frame, foreground='white')
        policy2.grid(row=3, column=2, padx=5, pady=5)

        ttk.Label(insurance_information_frame, text="Group").grid(row=4, column=0, padx=5, pady=5)
        group1 = ttk.Entry(insurance_information_frame)
        group1.grid(row=4, column=1, padx=5, pady=5)
        group2 = ttk.Entry(insurance_information_frame, foreground='white')
        group2.grid(row=4, column=2, padx=5, pady=5)

        ttk.Label(insurance_information_frame, text="Has Client received referral").grid(row=5, column=0, padx=5,
                                                                                         pady=5)
        client_referral = ttk.Checkbutton(insurance_information_frame, variable=eight)
        client_referral.grid(row=5, column=1, padx=5, pady=5)

        ttk.Label(insurance_information_frame, text="Primary Clinic").grid(row=6, column=0, padx=5, pady=5)
        primary_clinic = ttk.Entry(insurance_information_frame)
        primary_clinic.grid(row=6, column=1, padx=5, pady=5)

        ttk.Label(insurance_information_frame, text="Primary Provider").grid(row=7, column=0, padx=5, pady=5)
        primary_prov = ttk.Entry(insurance_information_frame)
        primary_prov.grid(row=7, column=1, padx=5, pady=5)

        ttk.Label(insurance_information_frame, text="Primary Provider Phone").grid(row=8, column=0, padx=5, pady=5)
        phone_num = ttk.Entry(insurance_information_frame)
        phone_num.grid(row=8, column=1, padx=5, pady=5)

        # Function to add new ICD Code record
        def add_code_record_popup():
            # Create a new Toplevel window
            popup = tk.Toplevel(self)
            popup.title("Edit")
            popup.geometry("400x300")

            # Create labels and entry fields
            ttk.Label(popup, text="Group").grid(row=0, column=0, padx=5, pady=5)
            group_entry = ttk.Entry(popup)
            group_entry.grid(row=0, column=1, padx=5, pady=5)

            ttk.Label(popup, text="Code").grid(row=1, column=0, padx=5, pady=5)
            code_entry = ttk.Entry(popup)
            code_entry.grid(row=1, column=1, padx=5, pady=5)

            # Update and Cancel buttons
            ttk.Button(popup, text="Update", command=lambda: [popup.destroy()]).grid(row=3, column=0, padx=5, pady=5)
            ttk.Button(popup, text="Cancel", command=lambda: [popup.destroy()]).grid(row=3, column=1, padx=5, pady=5)

        # Additional Points of Contact Section
        codes_frame = tk.LabelFrame(scrollable_frame, text="ICD Codes", padx=10, pady=10)
        codes_frame.grid(row=9, column=0, padx=5, pady=5, sticky='w')

        # Button to add a new point of contact
        ttk.Button(codes_frame, text="Add new record", command=add_code_record_popup).grid(row=0, column=0, padx=5,
                                                                                           pady=5, sticky="w")
        ttk.Label(codes_frame, text="Group").grid(row=2, column=1, padx=5, pady=5)
        group_entry = ttk.Entry(codes_frame)
        group_entry.grid(row=3, column=1, padx=5, pady=5)

        ttk.Label(codes_frame, text="Code").grid(row=2, column=2, padx=5, pady=5)
        code_entry = ttk.Entry(codes_frame)
        code_entry.grid(row=3, column=2, padx=5, pady=5)

        # Document Upload Section
        upload_frame = tk.LabelFrame(scrollable_frame, text="Document Upload", padx=10, pady=10)
        upload_frame.grid(row=10, column=0, padx=5, pady=5, sticky='w')

        ttk.Label(upload_frame, text="File Name:").grid(row=0, column=0, padx=5, pady=5, sticky="w")
        file_name_var = tk.StringVar()  # Variable to hold the filename
        file_name_entry = ttk.Entry(upload_frame, textvariable=file_name_var, width=50, state="readonly")
        file_name_entry.grid(row=0, column=1, padx=5, pady=5)

        # Function to open file dialog and set the filename
        def select_file():
            file_path = tk.filedialog.askopenfilename(title="Select a file", filetypes=[("All files", "*.*")])
            if file_path:  # If a file is selected
                file_name_var.set(file_path.split("/")[-1])  # Set the filename in the entry

        # Button to trigger file selection
        ttk.Button(upload_frame, text="Select Files...", command=select_file).grid(row=0, column=2, padx=5, pady=5)

        # Add placeholder for upload status (could be enhanced later)
        upload_status_label = ttk.Label(upload_frame, text="Maximum allowed file size is 10 MB.")
        upload_status_label.grid(row=1, column=0, columnspan=3, padx=5, pady=5)

        def save_case(dateRecieved, agency, personnel, closeReason, closeDate):

            sqlQuery = """
            UPDATE cac_case
            SET
            cac_received_date = %s,
            case_closed_date = %s,
            closed_reason_id = %s,
            cac_id = %s,
            mh_lead_employee_id = %s
            WHERE case_id = %s
            """
            data_tuple = (
                dateRecieved, closeDate, closeReason, agency, personnel, caseId)
            try:
                config = load_config()
                with psycopg2.connect(**config) as conn:
                    with conn.cursor() as cur:
                        cur.execute(sqlQuery, (data_tuple))
                        conn.commit
                        messagebox.showinfo("Save", "Case information has been saved successfully!")
            except (psycopg2.DatabaseError, Exception) as error:
                print(f"{error}")

        save_button = ttk.Button(widget_frame, text='SAVE',
                                 command=lambda: save_case(str(date_entry.get_date()), aReverse[main_agency.get()],
                                                           pReverse[main_personnel.get()],
                                                           closeReasonsReverse[close_reason.get()],
                                                           str(close_date.get_date())))
        cancel_button = ttk.Button(widget_frame, text='CANCEL')
        delete_button = ttk.Button(widget_frame, text='DELETE CASE')

        save_button.grid(row=1, column=0, sticky="w", padx=5)
        cancel_button.grid(row=1, column=1, sticky="w", padx=5)
        delete_button.grid(row=1, column=2, sticky="w", padx=5)

    # -------------------- Navigation Functions --------------------
    def show_lookup_tab(self):
        self.controller.show_frame(database_lookup_search.lookup_interface)

    def show_general_tab(self):
        self.controller.show_frame(GeneraltabInterface)

    def show_people_tab(self):
        self.controller.show_frame(people_interface.people_interface)

    def show_mh_basic(self):
        self.controller.show_frame(MH_basic_interface.MHBasicInterface)

    def show_mh_assessment(self):
        self.controller.show_frame(MH_assessment.MHassessment)

    def show_mh_treatment_plan(self):
        self.controller.show_frame(MH_treatmentPlan_interface.MH_treatment_plan_interface)

    def show_va_tab(self):
        self.controller.show_frame(va_tab_interface.va_interface)

    def show_case_notes(self):
        self.controller.show_frame(case_notes.case_notes_interface)