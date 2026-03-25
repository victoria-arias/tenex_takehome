# Define the upload endpoint
import os

from flask import Blueprint, current_app, jsonify, request
from werkzeug.utils import secure_filename

from services.parser import parse_log_file
from services.analyzer import analyze_logs
from services.anomaly_detector import detect_anomalies

upload_bp = Blueprint("upload", __name__)

def allowed_file(filename: str) -> bool:
    if "." not in filename:
        return False
    extension = filename.rsplit(".", 1)[1].lower()
    return extension in current_app.config["ALLOWED_EXTENSIONS"]

@upload_bp.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part in request"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Unsupported file type"}), 400

    filename = secure_filename(file.filename)
    save_path = os.path.join(current_app.config["UPLOAD_FOLDER"], filename)
    file.save(save_path)

    try:
        df = parse_log_file(save_path)
        analysis = analyze_logs(df)
        anomalies = detect_anomalies(df)

        response = {
            "filename": filename,
            "analysis": analysis,
            "anomalies": anomalies
        }

        if df.empty:
            response["message"] = "No valid log entries were found in the uploaded file."

        return jsonify(response), 200

    except Exception as exc:
        return jsonify({
            "error": "Failed to process log file",
            "details": str(exc)
        }), 500