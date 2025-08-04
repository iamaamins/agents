from agents import OpenAIChatCompletionsModel
from openai import AsyncOpenAI
from crewai import LLM
from app.config.env import ANTHROPIC_API_KEY, IS_DEV, MISTRAL_API_KEY

mistral_base_url = "https://api.mistral.ai/v1/"
anthropic_base_url = "https://api.anthropic.com/v1/"

mistral_model = "mistral-medium-latest"
anthropic_model = "claude-3-5-haiku-latest"


def get_openai_model(is_premium: bool = False) -> OpenAIChatCompletionsModel:
    if IS_DEV or not is_premium:
        return OpenAIChatCompletionsModel(
            model=mistral_model,
            openai_client=AsyncOpenAI(
                base_url=mistral_base_url, api_key=MISTRAL_API_KEY
            ),
        )

    return OpenAIChatCompletionsModel(
        model=anthropic_model,
        openai_client=AsyncOpenAI(
            base_url=anthropic_base_url, api_key=ANTHROPIC_API_KEY
        ),
    )


def get_crewai_llm(is_premium: bool = False) -> LLM:
    if IS_DEV or not is_premium:
        return LLM(model=f"mistral/{mistral_model}", api_key=MISTRAL_API_KEY)

    return LLM(model=f"anthropic/{anthropic_model}", api_key=ANTHROPIC_API_KEY)
