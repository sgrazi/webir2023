from elasticsearch import Elasticsearch
from decouple import config

# aplicacion de elasticsearch funcionando localmente
elasticsearch_client = Elasticsearch(
    hosts=["http://localhost:9200"],
    http_auth=(config("ES_USER"), config("ES_PASSWORD")),
)
