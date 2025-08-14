from fastapi.responses import JSONResponse
from fastapi import APIRouter, Depends, HTTPException, Query, Request
from app.middleware.limiter import RateLimiter, get_limiter

router = APIRouter(prefix="/utils")


@router.get(path="/health")
def health_check() -> JSONResponse:
    return JSONResponse(
        status_code=200, content={"message": "Server is up and running"}
    )


@router.get(path="/rate-limit/check")
async def check_rate_limit(
    request: Request,
    route: str = Query(default=..., description="The route path to check"),
    method: str = Query(default=..., description="The HTTP method"),
    limiter: RateLimiter = Depends(dependency=get_limiter),
) -> JSONResponse:
    """Check rate limit status for a specific user and route"""

    try:
        client_ip = limiter.get_client_ip(request=request)
        route = f"{method.upper()} {route}"

        status = limiter.get_rate_limit_status(client_ip=client_ip, route=route)

        return JSONResponse(status_code=200, content=status)

    except:
        raise HTTPException(status_code=500, detail="Error checking rate limit")
