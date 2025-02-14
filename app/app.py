from flask import Flask, jsonify
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Test Route
@app.route('/api/test', methods=['GET'])
def test_api():
    return jsonify({"message": "🚀 Frontend connected to Flask backend!"})

if __name__ == "__main__":
    app.run(debug=True)
