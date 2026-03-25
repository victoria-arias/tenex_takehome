# Define the login API endpoint
from flask import Blueprint, jsonify, request

from services.auth import validate_login

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}

    username = data.get("username", "")
    password = data.get("password", "")

    if validate_login(username, password):
        return jsonify({
            "success": True,
            "message": "Login successful",
            "token": "demo-token"
        }), 200

    return jsonify({
        "success": False,
        "message": "Invalid username or password"
    }), 401
