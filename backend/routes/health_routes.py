# Define a test endpoint to confirm the server is running

from flask import Blueprint, jsonify

health_bp = Blueprint("health", __name__) # create health blueprint

@health_bp.route("/health", methods=["GET"]) # define route on health blueprint
def health():
    return jsonify({"status": "ok"})