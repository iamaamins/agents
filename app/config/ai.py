from agents import OpenAIChatCompletionsModel
from openai import AsyncOpenAI
from crewai import LLM
from app.config.env import MISTRAL_API_KEY, IS_DEV, GEMINI_API_KEY

gemini_base_url = "https://generativelanguage.googleapis.com/v1beta/openai"
mistral_base_url = "https://api.mistral.ai/v1"

gemini_pro_model = "gemini-2.5-pro"
gemini_lite_model = "gemini-2.5-flash"
mistral_model = "mistral-medium-latest"


def get_openai_model(
    use_lite_model: bool = False, use_pro_model: bool = False
) -> OpenAIChatCompletionsModel:
    if not IS_DEV and use_lite_model:
        return OpenAIChatCompletionsModel(
            model=gemini_lite_model,
            openai_client=AsyncOpenAI(base_url=gemini_base_url, api_key=GEMINI_API_KEY),
        )

    if not IS_DEV and use_pro_model:
        return OpenAIChatCompletionsModel(
            model=gemini_pro_model,
            openai_client=AsyncOpenAI(base_url=gemini_base_url, api_key=GEMINI_API_KEY),
        )

    return OpenAIChatCompletionsModel(
        model=mistral_model,
        openai_client=AsyncOpenAI(base_url=mistral_base_url, api_key=MISTRAL_API_KEY),
    )


def get_crewai_llm(use_lite_model: bool = False, use_pro_model: bool = False) -> LLM:
    if not IS_DEV and use_lite_model:
        return LLM(model=f"gemini/{gemini_lite_model}", api_key=GEMINI_API_KEY)

    if not IS_DEV and use_pro_model:
        return LLM(model=f"gemini/{gemini_pro_model}", api_key=GEMINI_API_KEY)

    return LLM(model=f"mistral/{mistral_model}", api_key=MISTRAL_API_KEY)
