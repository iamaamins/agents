from crewai import Agent, Task, Crew, Process
from app.config.ai import get_crewai_llm
from pydantic import BaseModel, Field
from crewai_tools import SerperDevTool

llm = get_crewai_llm(use_lite_model=True)


class TrendingCompany(BaseModel):
    """A trending company found in the news"""

    name: str = Field(description="The name of the company")
    ticker: str = Field(description="The stock ticker symbol of the company")
    reason: str = Field(
        description="The reason why the company is trending in the news"
    )


class TrendingCompanies(BaseModel):
    """A list of trending companies found in the news"""

    companies: list[TrendingCompany] = Field(
        description="A list of trending companies found in the news"
    )


class TrendingCompanyResearch(BaseModel):
    """Research on a trending company"""

    name: str = Field(description="The name of the company")
    market_position: str = Field(description="The market position of the company")
    future_outlook: str = Field(description="The future outlook of the company")
    investment_potential: str = Field(
        description="The investment potential of the company"
    )


class TrendingCompanyResearches(BaseModel):
    """Research on a list of trending companies"""

    researches: list[TrendingCompanyResearch] = Field(
        description="A list of research on trending companies"
    )


def create_crew(sector: str) -> Crew:
    """Creates and returns a CrewAI Crew for stock picking"""

    trending_company_finder = Agent(
        role=f"Senior Financial News Analyst",
        goal=f"Analyze the latest market news to identify 2-3 innovative and high-potential companies that are making significant headlines. Focus on companies demonstrating notable market movements, breakthrough innovations, or strategic developments. Ensure diversity in selections and avoid repetition.",
        backstory="You are a veteran market intelligence expert with over 15 years of experience in spotting emerging market trends and identifying promising companies. Your expertise spans across multiple sectors, and you have a proven track record of identifying companies before they become mainstream success stories. You're known for your ability to separate genuine innovation and potential from market hype.",
        tools=[SerperDevTool()],
        llm=llm,
    )

    financial_researcher = Agent(
        role="Principal Financial Research Analyst",
        goal="Conduct comprehensive fundamental and technical analysis of identified trending companies, evaluating their market position, financial health, competitive advantages, and future growth potential.",
        backstory="You are a distinguished financial analyst with an MBA from Harvard and 20 years of experience in equity research at top investment firms. Your analytical reports are known for their depth, accuracy, and ability to uncover hidden value drivers. You've developed a proprietary framework that combines quantitative metrics with qualitative factors to evaluate company potential. Your past recommendations have consistently outperformed market benchmarks.",
        tools=[SerperDevTool()],
        llm=llm,
    )

    stock_picker = Agent(
        role="Chief Investment Strategist",
        goal="Analyze comprehensive research reports to identify the most promising investment opportunity. Evaluate companies based on multiple criteria including financial metrics, market position, competitive moat, management quality, and growth trajectory. Provide a detailed investment thesis with risk assessment and potential catalysts.",
        backstory="You are a renowned investment strategist with over 25 years of experience in global financial markets. You've managed multi-billion dollar portfolios and have a track record of identifying companies that delivered exceptional returns. Your investment philosophy combines Warren Buffett's value investing principles with modern growth metrics. You're known for your rigorous due diligence process and ability to spot red flags that others miss.",
        llm=llm,
    )

    manager = Agent(
        role="Chief Investment Officer",
        goal="Oversee and coordinate the entire investment research process to ensure thorough analysis and optimal decision-making. Ensure each team member's expertise is properly leveraged and their insights are effectively synthesized. Maintain high standards of due diligence while meeting time constraints.",
        backstory="You are a seasoned Chief Investment Officer with experience managing teams at top-tier investment firms. Your leadership has resulted in consistent alpha generation across market cycles. You excel at synthesizing diverse perspectives and maintaining high research standards. Known for building and leading high-performing investment teams that consistently identify winning investments.",
        llm=llm,
        allow_delegation=True,
    )

    find_trending_companies = Task(
        description=f"""Conduct a comprehensive scan of latest financial news and market movements in the {sector} sector to identify 2-3 promising companies.
        Focus on:
        1. Companies with significant recent developments (M&A, product launches, strategic shifts)
        2. Companies showing unusual market activity or institutional interest
        3. Companies receiving notable analyst coverage or upgrades
        4. Companies demonstrating innovation or market disruption potential
        Ensure selections are diverse and avoid previously analyzed companies.""",
        expected_output=f"A structured list of 2-3 trending companies in the {sector} sector",
        agent=trending_company_finder,
        output_pydantic=TrendingCompanies,
    )

    research_trending_companies = Task(
        description="""Perform deep-dive analysis on each identified company. Research should cover:
        1. Business Model & Revenue Streams
        2. Market Position & Competitive Analysis
        3. Financial Health (Key metrics, ratios, and trends)
        4. Management Team Assessment
        5. Growth Drivers & Market Opportunities
        6. Risk Factors & Challenges
        7. Valuation Analysis
        8. Recent Developments & Their Impact
        Use multiple sources to ensure comprehensive coverage.""",
        expected_output="Detailed investment research report for each company",
        agent=financial_researcher,
        context=[find_trending_companies],
        output_pydantic=TrendingCompanyResearches,
    )

    pick_best_company = Task(
        description="""Synthesize all research findings to identify the most compelling investment opportunity. Analysis should:
        1. Evaluate each company against a comprehensive set of investment criteria
        2. Compare relative strengths and weaknesses
        3. Assess risk-reward profiles
        4. Consider market timing and catalysts
        5. Evaluate valuation in relation to peers and growth potential
        Provide clear rationale for selection and non-selection of each company.""",
        expected_output="""Comprehensive investment recommendation including:
        1. Selected company with detailed investment thesis
        2. Key catalysts and growth drivers
        3. Risk factors and mitigation strategies
        4. Explanation of why other companies were not selected
        5. Suggested position sizing and entry strategy
        6. Key metrics to monitor""",
        agent=stock_picker,
        context=[research_trending_companies],
    )

    crew = Crew(
        agents=[
            trending_company_finder,
            financial_researcher,
            stock_picker,
        ],
        tasks=[find_trending_companies, research_trending_companies, pick_best_company],
        process=Process.hierarchical,
        manager_agent=manager,
        verbose=True,
    )

    return crew
