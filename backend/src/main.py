from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.spotify import router as spotify_router
from routes.elastic import router as elastic_router

app = FastAPI()

app.include_router(spotify_router, prefix="/spotify")
app.include_router(elastic_router, prefix="/elastic")

# Configure CORS settings
origins = ["http://localhost:8080"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}
