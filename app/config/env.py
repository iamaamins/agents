import os
import certifi
from dotenv import load_dotenv

load_dotenv()


def initialize_app_config():
    """Initialize all application configuration."""
    os.environ.setdefault("SSL_CERT_FILE", certifi.where())
    os.environ.setdefault("REQUESTS_CA_BUNDLE", certifi.where())


SENDGRID_API_KEY = os.environ.get("SENDGRID_API_KEY")
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
MISTRAL_API_KEY = os.environ.get("MISTRAL_API_KEY")
IS_DEV = os.environ.get("ENVIRONMENT") == "development"
