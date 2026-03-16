# handle API routes and orchestrate workflow
import os
from flask import Flask
from flask_cors import CORS

from config import Config # load Config class from config.py
from routes.health_routes import health_bp

# set up app settings
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config) # load Config attributes into Flask configuration system

    CORS(app) # enable CORS for Flask server

    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True) #check that upload folder exists

    app.register_blueprint(health_bp) #register health routes from blueprint

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5001) # port 5000 is usually reserved for AirPlay on Mac!
