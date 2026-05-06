#!/usr/bin/env python
"""
Development Server Runner - Auto-reloading ASGI Server

This script starts the FastAPI application in development mode with:
- Auto-reload: Code changes are automatically detected and the server restarts
- Detailed logging: All requests and responses are logged
- Debug mode: Detailed error messages and debugging information

Usage:
    python dev.py

The server will be accessible at:
    http://localhost:8080
    http://0.0.0.0:8080 (from any machine on the network)

API documentation will be available at:
    http://localhost:8080/docs (Swagger UI)
    http://localhost:8080/redoc (ReDoc)

NOTE: This should ONLY be used for development. For production, use:
    python api.py
    or
    gunicorn api:app --workers 4 --worker-class uvicorn.workers.UvicornWorker
"""

# ==================== IMPORTS ====================
import uvicorn  # ASGI server for running FastAPI apps

# ==================== MAIN EXECUTION ====================
if __name__ == "__main__":
    # Start the development server with auto-reload enabled
    print("🚀 Starting API in development mode with auto-reload...")
    print("   - Auto-reload: Enabled (server restarts on code changes)")
    print("   - Host: 0.0.0.0 (accessible from any IP)")
    print("   - Port: 8080")
    print("   - Log level: info")
    print("   - API docs: http://localhost:8080/docs")
    
    uvicorn.run(
        "api:app",  # Reference to FastAPI app in api.py
        host="0.0.0.0",  # Listen on all network interfaces
        port=8080,  # Listen on port 8080
        reload=True,  # Auto-reload on code changes
        log_level="info"  # Logging level (info, debug, warning, error)
    )
