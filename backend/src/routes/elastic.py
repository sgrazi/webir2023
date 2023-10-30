from fastapi import APIRouter
from query_factory import make_elastic_full_query, make_elastic_artist_query, make_elastic_lyric_query
from clients.elasticsearch_client import elasticsearch_client as es

router = APIRouter()


@router.get("/search")
def get_endpoint1(lyric: str = "", artist: str = "", orderBy: str = ""):
    elastic_query = ""
    if lyric and artist:
        elastic_query = make_elastic_full_query(lyric, artist, orderBy)
    elif artist:
        elastic_query = make_elastic_artist_query(artist, orderBy)
    elif lyric:
        elastic_query = make_elastic_lyric_query(lyric, orderBy)
    else:
        return {400, "No query was provided"}
    
    results = es.search(index="songs", body=elastic_query)

    return results["hits"]["hits"]
