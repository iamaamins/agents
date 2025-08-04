from agents import Agent
from app.agents.openai.deep_research.tools import research_manager_tools
from app.agents.openai.deep_research.worker_agents import (
    report_writer_agent,
)
from app.config.ai import get_openai_model

model = get_openai_model()


research_manager = Agent[str](
    name="Research manager",
    instructions="You're a research manager. Your role is to use the provided research_assistant tool to generate search terms for a topic. Once you get the search terms, you evaluate them to make sure these terms are capable of running good research for the topic. If you are not satisfied with the search terms and it's ability to conduct good research, you can use the research_assistant tool up to 3 times to generate great search terms. Once you have the search terms you're satisfied with, you use the search_agent tool to conduct the web searches for each search term. Once the searches are done, you handoff the search results with the query to the writer_agent who will write the research report.",
    model=model,
    tools=research_manager_tools,
    handoffs=[report_writer_agent],
)
