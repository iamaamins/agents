from agents import OpenAIChatCompletionsModel
from openai import AsyncOpenAI
from crewai import LLM
from app.config.env import ANTHROPIC_API_KEY, IS_DEV, GEMINI_API_KEY

gemini_base_url = "https://generativelanguage.googleapis.com/v1beta/openai"
anthropic_base_url = "https://api.anthropic.com/v1/"

gemini_model = "gemini-2.5-flash"
anthropic_model = "claude-3-5-haiku-latest"


def get_openai_model(use_premium_model: bool = False) -> OpenAIChatCompletionsModel:
    if IS_DEV or not use_premium_model:
        return OpenAIChatCompletionsModel(
            model=gemini_model,
            openai_client=AsyncOpenAI(base_url=gemini_base_url, api_key=GEMINI_API_KEY),
        )

    return OpenAIChatCompletionsModel(
        model=anthropic_model,
        openai_client=AsyncOpenAI(
            base_url=anthropic_base_url, api_key=ANTHROPIC_API_KEY
        ),
    )


def get_crewai_llm(use_premium_model: bool = False) -> LLM:
    if IS_DEV or not use_premium_model:
        return LLM(model=f"gemini/{gemini_model}", api_key=GEMINI_API_KEY)

    return LLM(model=f"anthropic/{anthropic_model}", api_key=ANTHROPIC_API_KEY)
