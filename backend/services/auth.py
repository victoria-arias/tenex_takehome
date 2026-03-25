# basic authentication method
from config import Config

def validate_login(username: str, password: str) -> bool:
    return (
        username == Config.DEMO_USERNAME and
        password == Config.DEMO_PASSWORD
    )