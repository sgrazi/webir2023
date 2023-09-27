from fastapi import APIRouter
from query_factory import make_elastic_lyric_query
from clients.elasticsearch_client import elasticsearch_client as es

router = APIRouter()


@router.get("/search")
def get_endpoint1(query: str):
    elastic_query = make_elastic_lyric_query(query)
    results = es.search(index="songs", body=elastic_query)

    return results["hits"]["hits"]
