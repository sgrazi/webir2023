from fastapi import APIRouter, Query
from query_factory import make_elastic_lyric_query
from clients.elasticsearch_client import elasticsearch_client as es

router = APIRouter()

@router.get("/search")
def get_endpoint1(
    query: str, 
    limit: int = Query(default=10, description="Number of items to retrieve"), 
    offset: int = Query(default=0, description="Offset for starting index of the query")
):
    
    elastic_query = make_elastic_lyric_query(query, limit, offset)
    results = es.search(index="songs", body=elastic_query)

    return results["hits"]["hits"]

