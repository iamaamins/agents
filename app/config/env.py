import os
import certifi
from dotenv import load_dotenv

_ = load_dotenv(override=True)


def initialize_app_config() -> None:
    """Initialize all application configuration."""
    _ = os.environ.setdefault(key="SSL_CERT_FILE", value=certifi.where())
    _ = os.environ.setdefault(key="REQUESTS_CA_BUNDLE", value=certifi.where())


SENDGRID_API_KEY = os.environ.get("SENDGRID_API_KEY")
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
MISTRAL_API_KEY = os.environ.get("MISTRAL_API_KEY")
IS_DEV = os.environ.get("ENVIRONMENT") == "development"
