from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.spotify import router

app = FastAPI()

app.include_router(router, prefix="/spotify")

# Configure CORS settings
origins = ["http://localhost:3000"]
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
