import datetime
from fastapi import APIRouter, Query, HTTPException
from clients.spotify_client import spotify_client

router = APIRouter()

"""
.search(q, limit=10, offset=0, type='track', market=None)
Parameters:
    q - la query de busqueda
        Puedes refinar tu búsqueda utilizando filtros de campo
        Los filtros disponibles son album, artist, track, year, upc, tag:hipster, tag:new, y genre
        Cada filtro de campo solo se aplica a ciertos tipos de resultados:
        - Los filtros de artista y year se pueden usar al buscar albums, artists y tracks. Puedes filtrar por un solo año o un rango.
        - El filtro de album se puede utilizar al buscar albums y tracks.
        - El filtro de genre se puede utilizar al buscar artists y tracks.
        - El filtro de track se puede utilizar al buscar tracks.
        - Los filtros de tag:new y tag:hipster solo se pueden utilizar al buscar albums. 
            El filtro de tag:new devolverá álbumes lanzados en las últimas dos semanas, 
            el filtro de tag:hipster se puede usar para devolver solo álbumes con el 10% de popularidad más bajo.
    limit - el numero de items a retornar (min = 1, default = 10, max = 50)
        El limite es aplicado dentro de cada tipo, no la respuesta total
    offset - el indica del primer item a retornar
    type - el tipo de los items a retornar, uno o mas de 'artist', 'album', 'track', 'playlist', 'show', y 'episode'
        Si se desean mas de un tipo, se pasan en un string separado por coma; e.g., 'track,album,episode'.
    market - Un codigo de pais ISO 3166-1 alpha-2.
"""


@router.get("/search")
def get_endpoint1(
    query: str,
    types: list[str] = Query(
        description="List of types", example=["artist", "album", "track"]
    ),
    limit: int = 10,
    album: str = "",
    genre: str = "",
    artist: str = "",
    start_year: int = Query(default=2000, description="Start year of the range"),
    end_year: int = Query(default=2023, description="End year of the range"),
    new: bool = False,
    hipster: bool = False,
):
    # check types is not empty
    # check every value in types is "album", "artist" or "track"
    # check current_year >= start_year >= 0
    # check current_year >= end_year >= 0
    # if start_year and end_year check start_year <= end_year
    # if album is not "" check type is album and/or track
    # if genre is not "" check type is artist and/or track
    # if track is not "" check type is track
    # if hipster or new check type is album
    # check 1 <= limit <= 50
    # check 0 <= offset <= 1000

    # procesar los tipos a un unico string, los tipos se separan por coma
    # procesar la query con los filtros de campo indicados (album, genre, artist, track, start_year, end_year, new, hipster)
    current_year = datetime.date.today().year
    if start_year < 0 or end_year < 0:
        raise HTTPException(
            status_code=400, detail=f"start_year y end_year tienen que ser >= 0"
        )
    if start_year > end_year or start_year > current_year or current_year < end_year:
        raise HTTPException(
            status_code=400, detail=f"start_year y end_year tienen valores invalidos"
        )
    if not types:
        raise HTTPException(status_code=400, detail=f"types no puede ser vacio")

    for elem in types:
        if elem != "album" and elem != "artist" and elem != "track":
            raise HTTPException(
                status_code=400,
                detail=f"Los elementos de type no son validos.",
            )
    query_types: str = ",".join(types)

    response = spotify_client.search(q=query, limit=limit, type=types, market=None)

    return response
