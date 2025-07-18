from fastapi import APIRouter
from sendgrid.helpers.mail import Mail
from app.agents.sales_manager.managers import run_sales_manager

router = APIRouter()


@router.post("/sales-manager/generate-and-send-cold-email")
async def chat():
    result = await run_sales_manager()
    return {"message": result}
