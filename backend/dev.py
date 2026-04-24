#!/usr/bin/env python
"""
Development server runner with reload enabled
This allows for hot-reloading code changes
Usage: python dev.py
"""
import uvicorn

if __name__ == "__main__":
    print("🚀 Starting API in development mode with auto-reload...")
    uvicorn.run(
        "api:app",
        host="0.0.0.0",
        port=8080,
        reload=True,
        log_level="info"
    )
