from fastapi import FastAPI
from app.middleware.exception import ExceptionMiddleware
from fastapi.middleware.cors import CORSMiddleware
from app.middleware.limiter import RateLimitMiddleware
from app.routers.agents import sales_flow
from app.config.env import initialize_app_config

initialize_app_config()

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://www.alaminshaikh.com",
    "https://dev.alaminshaikh.com",
]

# Middlewares
app.add_middleware(ExceptionMiddleware)
app.add_middleware(RateLimitMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check route
@app.get("/")
def health_check():
    return {"message": "Server is up and running"}


# Routers
app.include_router(sales_flow.router)
