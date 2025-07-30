from agents import Agent, WebSearchTool
from agents.model_settings import ModelSettings
from pydantic import BaseModel


class SearchItem(BaseModel):
    reason: str
    """Your reasoning for why this search is important to the query"""

    query: str
    """The search term to use for the web search"""


class SearchItems(BaseModel):
    items: list[SearchItem]
    """A list of web searches to perform to best answer the query"""


research_assistant = Agent[SearchItems](
    name="Research assistant",
    instructions="You are a helpful research assistant. Given a query, come up with a set of web searches to perform to best answer the query. Output 3 terms to query for.",
    model="gpt-4o-mini",
    output_type=SearchItems,
)

search_agent = Agent[str](
    name="Search agent",
    instructions="You are a research assistant. Given a search term, you search the web for that term and produce a concise summary of the results. The summary must 2-3 paragraphs and less than 300 words. Capture the main points. Write succintly, no need to have complete sentences or good grammar. This will be consumed by someone synthesizing a report, so it's vital you capture the essence and ignore any fluff. Do not include any additional commentary other than the summary itself.",
    tools=[WebSearchTool(search_context_size="low")],
    model="gpt-4o-mini",
    model_settings=ModelSettings(tool_choice="required"),
)


class Report(BaseModel):
    summary: str
    """A short 2-3 sentence summary of the findings"""

    report: str
    """The final report"""

    questions: list[str]
    """Suggested topics to research further"""


writer_agent = Agent[Report](
    name="Writer agent",
    instructions="You are a senior researcher tasked with writing a cohesive report for a research query. You will be provided with the original query, and some initial research done by a research assistant. You should first come up with an outline for the report that describes the structure and flow of the report. Then, generate the report and return that as your final output. The final output should be in markdown format, and it should be lengthy and detailed. Aim for 5-10 pages of content, at least 1000 words.",
    model="gpt-4o-mini",
    output_type=Report,
)
