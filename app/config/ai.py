from agents import OpenAIChatCompletionsModel
from openai import AsyncOpenAI
from app.config.env import ANTHROPIC_API_KEY

claude_client = AsyncOpenAI(
    base_url="https://api.anthropic.com/v1/",
    api_key=ANTHROPIC_API_KEY,
)
claude_model = OpenAIChatCompletionsModel(
    model="claude-3-5-haiku-latest", openai_client=claude_client
)
