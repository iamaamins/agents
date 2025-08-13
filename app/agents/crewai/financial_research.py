from crewai import Agent, Task, Crew, Process
from app.config.ai import get_crewai_llm
from crewai_tools import SerperDevTool

llm = get_crewai_llm()


def create_crew(company: str) -> Crew:
    """Creates and returns a CrewAI Crew for financial research"""

    researcher_agent = Agent(
        role=f"Senior Financial Researcher for {company}",
        goal=f"Research the company, news and potential for {company}",
        backstory=f"You're a seasoned financial researcher with a talent for finding the most relevant information about {company}. Known for your ability to find the most relevant information and present it in a clear and concise manner.",
        llm=llm,
        tools=[SerperDevTool()],
    )

    analyst_agent = Agent(
        role=f"Market Analyst and Report writer focused on {company}",
        goal=f"Analyze company {company} and create a comprehensive, well-structured report that presents insights in a clear and engaging way.",
        backstory="You're a meticulous, skilled analyst with a background in financial analysis and company research. You have a talent for identifying patterns and extracting meaningful insights from research data, then communicating those insights through well crafted reports.",
        llm=llm,
    )

    research_task = Task(
        description=f"Conduct thorough research on company {company}. Focus on: "
        "1. Current company status and health"
        "2. Historical company performance"
        "3. Major challenges and opportunities"
        "4. Recent news and events"
        "5. Future outlook and potential developments"
        "Make sure to organize your findings in a structured format with clear sections.",
        expected_output=f"A comprehensive research document with well-organized sections covering all the requested aspects of {company}. Include specific facts, figures, and examples where relevant.",
        agent=researcher_agent,
    )

    analysis_task = Task(
        description=f"Analyze the research findings and create a comprehensive report on {company}."
        "Your report should:"
        "1. Begin with an executive summary"
        "2. Include all key information from the research"
        "3. Provide insightful analysis of trends and patterns"
        "4. Offer a market outlook for company, noting that this should not be used for trading decisions"
        "5. Be formatted in a professional, easy-to-read style with clear headings.",
        expected_output=f"A polished, professional report on {company} that presents the research findings with added analysis and insights. The report should be well-structured with an executive summary, main sections, and conclusion.",
        agent=analyst_agent,
    )

    crew = Crew(
        agents=[researcher_agent, analyst_agent],
        tasks=[research_task, analysis_task],
        process=Process.sequential,
    )

    return crew
