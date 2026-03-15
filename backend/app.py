# handle API routes and orchestrate workflow
from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Tenex log analyzer backend running"})

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(debug=True, port=5001) # port 5000 is automatically reserved for AirPlay on Mac!
