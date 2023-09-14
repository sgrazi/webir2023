from fastapi import APIRouter
from clients.spotify_client import spotify_client

router = APIRouter()


@router.get("/spotify_track")
def get_endpoint1(artist: str, track: str):
    response = spotify_client.search(q=f"artist:{artist} track:{track}", type="track")
    return response
