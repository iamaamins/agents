from crewai import Agent, Task, Crew, Process
from app.config.ai import get_crewai_llm
from crewai_tools import SerperDevTool
from app.lib.utils import current_year


llm = get_crewai_llm(use_lite_model=True)


def create_crew(company: str) -> Crew:
    """Creates and returns a CrewAI Crew for financial research"""

    researcher_agent = Agent(
        role=f"Senior Financial Researcher specializing in {company}",
        goal=f"Research the current year ({current_year}) information, latest news and future potential for {company}",
        backstory=f"You're a seasoned financial researcher with a talent for finding the most up-to-date information about {company}. You always prioritize the latest data and ensure information is up-to-date. Known for your ability to find the most relevant and recent information and present it in a clear and concise manner.",
        llm=llm,
        tools=[SerperDevTool()],
    )

    analyst_agent = Agent(
        role=f"Market Analyst and Report writer for {company}",
        goal=f"Analyze {company} and create a comprehensive, well-structured report that presents insights in a clear and engaging way.",
        backstory="You're a meticulous, skilled analyst with a background in financial analysis and company research. You have a talent for identifying patterns and extracting meaningful insights from research data, then communicating those insights through well crafted reports. You always provide clean, professional reports without including any system thoughts or unnecessary markers.",
        llm=llm,
    )

    research_task = Task(
        description=f"Conduct thorough research on {company}, focusing specifically on the current year ({current_year}) data and the most recent developments. Focus on:\n1. Current company status and health ({current_year} data)\n2. Latest quarterly performance of ({current_year})\n3. Major challenges and opportunities in the current market\n4. Most recent news and events (from {current_year})\n5. Future outlook and potential developments\nMake sure to organize your findings in a structured format with clear sections. Explicitly verify and state the date of all information.",
        expected_output=f"A comprehensive research document with well-organized sections covering all the requested aspects of {company}. Include specific facts, figures, and examples where relevant.",
        agent=researcher_agent,
    )

    analysis_task = Task(
        description=f"Analyze the research findings and create a comprehensive report on {company}."
        "Your report should:\n1. Begin with an executive summary\n2. Include all key information from the research\n3. Provide insightful analysis of trends and patterns\n4. Offer a market outlook for company, noting that this should not be used for trading decisions\5. Be formatted in a professional, easy-to-read style with clear headings\nImportant: Provide only the report content without any meta-commentary, system messages, or markers like 'Thought:', 'End of Report', etc. Start directly with the report content.",
        expected_output=f"A clean, polished report on {company} that starts directly with the executive summary and ends with the conclusion. The report should be professionally formatted with clear headings and no system messages or meta-commentary.",
        agent=analyst_agent,
    )

    crew = Crew(
        agents=[researcher_agent, analyst_agent],
        tasks=[research_task, analysis_task],
        process=Process.sequential,
    )

    return crew
