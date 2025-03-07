import sys
import os

# Add the app directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'app')))

from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import psycopg2
from database.config import load_config
from database.connect import connect

app = Flask(__name__)
CORS(app)

# In-memory storage for AOI events (for testing purposes)
aoi_events = []

@app.route('/api/aoi_event', methods=['POST'])
def log_aoi_event():
    data = request.json
    timestamp = time.strftime('%H:%M:%S')
    event = {
        "timestamp": timestamp,
        "event_type": data.get("event_type"),
        "coordinates": data.get("coordinates"),
        "mouse_click": data.get("mouse_click"),
        "text_input": data.get("text_input"),
        "text_activity": data.get("text_activity")
    }
    aoi_events.append(event)
    print(f"Logged AOI Event: {event}")
    return jsonify({"message": "AOI event logged successfully"}), 200


@app.route('/api/events', methods=['GET'])
def get_events():
    return jsonify(aoi_events)


@app.route('/api/test', methods=['GET'])
def test_connection():
    return jsonify({"message": "Backend is connected!"})


# New endpoint for GeneralTab
@app.route('/api/general-tab', methods=['GET'])
def get_general_tab():
    conn = connect(load_config("database.ini"))
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT name, description, id FROM general_tab")
            rows = cur.fetchall()
            data = [{"name": r[0], "description": r[1], "id": r[2]} for r in rows]
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()


if __name__ == "__main__":
    app.run(debug=True)
