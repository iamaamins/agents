from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from collections import defaultdict
from datetime import datetime, timedelta
from typing import Dict, Tuple


class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)

        self.max_requests = 2
        self.time_window = timedelta(hours=1)
        self.request_history: Dict[Tuple[str, str], list] = defaultdict(list)

    def get_client_ip(self, request: Request) -> str:
        """Extract client IP address, handling proxies and load balancers."""

        forwarded_for = request.headers.get("x-forwarded-for")
        if forwarded_for:
            return forwarded_for.split(",")[0].strip()

        real_ip = request.headers.get("x-real-ip")
        if real_ip:
            return real_ip.strip()

        return getattr(request.client, "host")

    def cleanup_old_requests(self, ip_route_key: Tuple[str, str]):
        """Remove timestamps older than the time window"""

        current_time = datetime.now()
        cutoff_time = current_time - self.time_window

        self.request_history[ip_route_key] = [
            timestamp
            for timestamp in self.request_history[ip_route_key]
            if timestamp > cutoff_time
        ]

    async def dispatch(self, request: Request, call_next):
        client_ip = self.get_client_ip(request)
        route = f"{request.method} {request.url.path}"
        ip_route_key = (client_ip, route)

        self.cleanup_old_requests(ip_route_key)
        current_requests = len(self.request_history[ip_route_key])

        if current_requests >= self.max_requests:
            oldest_request = min(self.request_history[ip_route_key])
            next_allowed = oldest_request + self.time_window
            seconds_until_reset = (next_allowed - datetime.now()).total_seconds()

            return JSONResponse(
                status_code=429,
                content={
                    "error": "Rate limit exceeded",
                    "message": f"Maximum {self.max_requests} requests per hour exceeded for this route",
                    "retry_after_seconds": max(0, int(seconds_until_reset)),
                    "client_ip": client_ip,
                    "route": route,
                },
            )
        self.request_history[ip_route_key].append(datetime.now())

        response = await call_next(request)
        return response
