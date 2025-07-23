from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from app.middleware.limiter import RateLimiter, get_limiter

router = APIRouter(prefix="/utils")


@router.get("/health")
def health_check():
    return JSONResponse(status_code=200, content="Server is up and running")


@router.post("/rate-limit/check/{route:path}")
async def check_rate_limit(
    request: Request,
    route: str,
    method: str,
    limiter: RateLimiter = Depends(get_limiter),
):
    """Check rate limit status for a specific user and route"""

    try:
        client_ip = limiter.get_client_ip(request=request)
        route = f"{method.upper()} /{route}"

        status = limiter.get_rate_limit_status(client_ip=client_ip, route=route)

        return JSONResponse(status_code=200, content=status)

    except:
        raise HTTPException(status_code=500, detail="Error checking rate limit")
