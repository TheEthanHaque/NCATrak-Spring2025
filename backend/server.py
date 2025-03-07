import os
from flask import Flask, request, jsonify
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure upload folder exists
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Connect to PostgreSQL
def get_db_connection():
    return psycopg2.connect(
        dbname="ncatrak",
        user="ethan",
        password="securepassword",
        host="localhost"
    )

# Fetch treatment plans
@app.route('/api/treatment-plans', methods=['GET'])
def get_treatment_plans():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT planned_start_date, treatment_model_id, provider_agency_id FROM case_mh_treatment_plans")
    rows = cur.fetchall()
    conn.close()
    
    treatment_plans = [{"startDate": row[0], "treatmentModel": row[1], "providerAgency": row[2]} for row in rows]
    return jsonify(treatment_plans)

# Add new treatment plan
@app.route('/api/add-treatment-plan', methods=['POST'])
def add_treatment_plan():
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO case_mh_treatment_plans (planned_start_date, treatment_model_id, provider_agency_id) VALUES (%s, %s, %s)",
        (data["startDate"], data["treatmentModel"], data["providerAgency"])
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Success"}), 201

# Handle document uploads
@app.route('/api/upload-document', methods=['POST'])
def upload_document():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    filepath = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(filepath)

    return jsonify({"message": "File uploaded successfully", "filename": file.filename})

# 🔍 Search database records
@app.route('/api/search', methods=['POST'])
def search_records():
    data = request.json
    case_id = data.get("caseId", "").strip()
    first_name = data.get("firstName", "").strip()
    last_name = data.get("lastName", "").strip()
    dob = data.get("dob", "").strip()

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # 🔹 Dynamic query construction
        query = "SELECT case_id, first_name, last_name, dob, details FROM records WHERE 1=1"
        params = []

        if case_id:
            query += " AND case_id::text ILIKE %s"
            params.append(f"%{case_id}%")
        if first_name:
            query += " AND first_name ILIKE %s"
            params.append(f"%{first_name}%")
        if last_name:
            query += " AND last_name ILIKE %s"
            params.append(f"%{last_name}%")
        if dob:
            query += " AND dob = %s"
            params.append(dob)

        cur.execute(query, tuple(params))
        results = cur.fetchall()
        conn.close()

        records = [{"caseId": row[0], "firstName": row[1], "lastName": row[2], "dob": row[3], "details": row[4]} for row in results]
        return jsonify(records)

    except Exception as error:
        return jsonify({"error": f"Database Error: {error}"}), 500

# 🔍 Fetch full details of a single record
@app.route('/api/get-record/<case_id>', methods=['GET'])
def get_record_details(case_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM records WHERE case_id = %s", (case_id,))
        record = cur.fetchone()
        conn.close()

        if not record:
            return jsonify({"error": "Record not found"}), 404

        record_details = {
            "caseId": record[0],
            "firstName": record[1],
            "lastName": record[2],
            "dob": record[3],
            "details": record[4]  # Adjust based on actual column indexes
        }
        return jsonify(record_details)

    except Exception as error:
        return jsonify({"error": f"Database Error: {error}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
