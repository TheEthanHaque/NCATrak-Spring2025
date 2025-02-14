from flask import Flask, request, jsonify
from flask_cors import CORS
import time

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


if __name__ == "__main__":
    app.run(debug=True)
