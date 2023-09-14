import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

"""
export SPOTIPY_CLIENT_ID=961156e781c24ff0926e04ae66226978
export SPOTIPY_CLIENT_SECRET=63acbb7f54b342a1801aea71a1ebce52
"""
spotify_client = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())
