# config.py : store application settings
import os


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# upload folder path
# allowed file extensions
# maximum upload size
# demo username and password
class Config:
    UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
    
    ALLOWED_EXTENSIONS = {"log", "txt", "csv"}
    
    MAX_FILE_SIZE = 5 * 1024 * 1024 # 5 MB
    
    DEMO_USERNAME = "admin"
    DEMO_PASSWORD = "Tenex2026"