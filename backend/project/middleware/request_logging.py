import logging
import time

logger = logging.getLogger("api")

class RequestLoggingMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        
        start_time = time.time()

        response = self.get_response(request)

        duration = (time.time() - start_time) * 1000

        user_id = None
        if hasattr(request, "user") and request.user.is_authenticated:
            user_id = request.user.id

        logger.info(
            "method=%s path=%s user=%s status=%s duration_ms=%.2f",
            request.method,
            request.path,
            user_id,
            response.status_code,
            duration,
        )

        return response