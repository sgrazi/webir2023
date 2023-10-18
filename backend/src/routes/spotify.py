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
def get_spotify_search(
    query: str,
    types: list[str] = Query(
        description="List of types", example=["artist", "album", "track"]
    ),
    limit: int = Query(default=10, description="Number of retrived elements"),
    offset: int = Query(default=0, description="Offset for starting index of query"),
    album: str = "",
    genre: str = "",
    artist: str = "",
    start_year: int = Query(default=None, description="Start year of the range"),
    end_year: int = Query(default=None, description="End year of the range"),
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
    if start_year and end_year:
        valid_year_checks(start_year, end_year)
        query += f" year:{start_year}-{end_year}"

    type_checks(types)
    query_types: str = ",".join(types)
    (genre_filter, album_filter, artist_filter) = filters_checks(
        types, album, genre, artist
    )
    if album_filter:
        query += f" album:{album}"
    if genre_filter:
        query += f" genre:{genre}"
    if artist_filter:
        query += f" artist:{artist}"

    hipster_track_checks(types, new, hipster)
    if new:
        query += f" tag:new"
    if hipster:
        query += f" tag:hipster"
    limit_offset_checks(limit, offset)

    response = spotify_client.search(
        q=query, limit=limit, type=query_types, market=None, offset=offset
    )

    return response


def limit_offset_checks(limit, offset):
    if not (1 <= limit <= 50) and not (0 <= offset <= 1000):
        raise HTTPException(
            status_code=400, detail=f"limit o offset tienen valores invalidos"
        )
    return True


def hipster_track_checks(types, new, hipster):
    if hipster or new and not any(elem == "album" for elem in types):
        err = "hipster" if not (hipster) else "new"
        raise HTTPException(
            status_code=400, detail=f"{err} no es valido con el campo type"
        )
    return True


def filters_checks(types, album, genre, artist):
    genre_filter, album_filter, artist_filter = False, False, False
    if genre and not any((elem == "album" or elem == "track") for elem in types):
        raise HTTPException(status_code=400, detail=f"El filtro genre no es valido")
    genre_filter = bool(genre)
    if album and not any((elem == "album" or elem == "track") for elem in types):
        raise HTTPException(status_code=400, detail=f"El filtro album no es valido")
    album_filter = bool(album)
    if artist and not any(elem == "track" for elem in types):
        raise HTTPException(status_code=400, detail=f"El filtro artist no es valido")
    artist_filter = bool(artist)

    return (genre_filter, album_filter, artist_filter)


def valid_year_checks(start_year, end_year):
    current_year = datetime.date.today().year
    if start_year < 0 or end_year < 0:
        raise HTTPException(
            status_code=400, detail=f"start_year y end_year tienen que ser >= 0"
        )
    if start_year > end_year or start_year > current_year or current_year < end_year:
        raise HTTPException(
            status_code=400, detail=f"start_year y end_year tienen valores invalidos"
        )
    return True


def type_checks(types):
    if not types:
        raise HTTPException(status_code=400, detail=f"types no puede ser vacio")

    for elem in types:
        if elem != "album" and elem != "artist" and elem != "track":
            raise HTTPException(
                status_code=400,
                detail=f"Los elementos de type no son validos.",
            )
    return True
