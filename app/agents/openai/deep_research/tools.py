from app.agents.openai.deep_research.worker_agents import (
    research_agent,
    research_assistant_agent,
)


research_agent_tool = research_agent.as_tool(
    tool_name="research_agent",
    tool_description="Conduct a web search for the provided search term",
)

research_assistant_tool = research_assistant_agent.as_tool(
    tool_name="research_assistant",
    tool_description="Generate search terms to query for.",
)

research_manager_tools = [research_assistant_tool, research_agent_tool]
