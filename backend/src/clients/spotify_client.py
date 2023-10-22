import spotipy
import os
from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv

load_dotenv()
client_id = os.getenv("SPOTIPY_CLIENT_ID")
client_secret = os.getenv("SPOTIPY_CLIENT_SECRET")

client_credentials_manager = SpotifyClientCredentials(
    client_id=client_id,
    client_secret=client_secret,
)

spotify_client = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
