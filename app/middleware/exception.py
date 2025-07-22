from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware


class ExceptionMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            return await call_next(request)

        except HTTPException as http_exc:
            raise http_exc

        except Exception as exc:
            print(exc)

            if "not a valid ObjectId" in str(exc):
                return JSONResponse(
                    status_code=500, content={"detail": "Invalid ObjectId"}
                )

            return JSONResponse(
                status_code=500, content={"detail": "Internal server error"}
            )
