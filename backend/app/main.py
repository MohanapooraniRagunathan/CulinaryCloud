from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routers import recipes

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Recipe API")

# CORS settings to allow React frontend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # allow your React app
    allow_credentials=True,
    allow_methods=["*"],           # allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],           # allow all headers
)

# Include recipe router
app.include_router(recipes.router, prefix="/api/recipes")
