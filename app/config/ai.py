from agents import OpenAIChatCompletionsModel
from openai import AsyncOpenAI
from app.config.env import ANTHROPIC_API_KEY, IS_DEV, MISTRAL_API_KEY

base_url = "https://api.mistral.ai/v1/" if IS_DEV else "https://api.anthropic.com/v1/"
api_key = MISTRAL_API_KEY if IS_DEV else ANTHROPIC_API_KEY
model = "mistral-medium-latest" if IS_DEV else "claude-3-5-haiku-latest"

client = AsyncOpenAI(base_url=base_url, api_key=api_key)
chat_completions_model = OpenAIChatCompletionsModel(model=model, openai_client=client)
