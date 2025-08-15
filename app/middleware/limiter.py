from fastapi import Request, Response
from fastapi.responses import JSONResponse
from collections import defaultdict
from datetime import datetime, timedelta

IpRouteKey = tuple[str, str]
RequestTimestamps = list[datetime]


class RateLimiter:
    def __init__(self) -> None:
        self.max_requests: int = 1
        self.time_window: timedelta = timedelta(hours=24)
        self.excluded_routes: set[str] = {"/utils", "/docs", "/redoc"}
        self.request_history: dict[IpRouteKey, RequestTimestamps] = defaultdict[
            IpRouteKey, RequestTimestamps
        ](list)

    def get_client_ip(self, request: Request) -> str:
        """Extract client IP address, handling proxies and load balancers"""

        forwarded_for = request.headers.get("x-forwarded-for")
        if forwarded_for:
            return forwarded_for.split(sep=",")[0].strip()

        real_ip = request.headers.get("x-real-ip")
        if real_ip:
            return real_ip.strip()

        return getattr(request.client, "host")

    def cleanup_old_requests(self, ip_route_key: tuple[str, str]) -> None:
        """Remove timestamps older than the time window"""

        current_time = datetime.now()
        cutoff_time = current_time - self.time_window

        self.request_history[ip_route_key] = [
            timestamp
            for timestamp in self.request_history[ip_route_key]
            if timestamp > cutoff_time
        ]

    def get_rate_limit_status(self, client_ip: str, route: str) -> bool:
        """Get rate limit status for a specific client IP and route"""

        ip_route_key = (client_ip, route)
        self.cleanup_old_requests(ip_route_key)

        current_requests = len(self.request_history[ip_route_key])
        is_rate_limited = current_requests >= self.max_requests

        return is_rate_limited

    async def dispatch(self, request: Request, call_next) -> Response:
        if any(
            request.url.path.startswith(excluded_route)
            for excluded_route in self.excluded_routes
        ):
            return await call_next(request)

        client_ip = self.get_client_ip(request)
        route = f"{request.method} {request.url.path}"

        ip_route_key = (client_ip, route)
        self.cleanup_old_requests(ip_route_key)

        current_requests = len(self.request_history[ip_route_key])
        is_rate_limited = current_requests >= self.max_requests

        if is_rate_limited:
            return JSONResponse(
                status_code=429,
                content={"detail": "Maximum 1 request/day is allowed"},
            )

        self.request_history[ip_route_key].append(datetime.now())
        response = await call_next(request)
        return response


def get_limiter(request: Request) -> RateLimiter:
    """Dependency to get the shared RateLimiter instance from app.state."""

    return request.app.state.limiter
