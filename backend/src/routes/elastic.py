from fastapi import APIRouter, Query
from query_factory import make_elastic_full_query, make_elastic_artist_query, make_elastic_lyric_query
from clients.elasticsearch_client import elasticsearch_client as es

router = APIRouter()

@router.get("/search")

def get_endpoint1(
    lyric: str = "", 
    artist: str = "", 
    orderBy: str = "", 
    limit: int = Query(default=10, description="Number of items to retrieve"), 
    offset: int = Query(default=0, description="Offset for starting index of the query")
):
    elastic_query = ""
    if lyric and artist:
        elastic_query = make_elastic_full_query(lyric, artist, orderBy, limit, offset)
    elif artist:
        elastic_query = make_elastic_artist_query(artist, orderBy, limit, offset)
    elif lyric:
        elastic_query = make_elastic_lyric_query(lyric, orderBy, limit, offset)
    else:
        return {400, "No query was provided"}
    
    results = es.search(index="songs", body=elastic_query)

    return results["hits"]["hits"]

