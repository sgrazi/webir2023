import os
from elasticsearch import Elasticsearch
from dotenv import load_dotenv

load_dotenv()
elastic_password = os.getenv("ELASTIC_PASSWORD")
elastic_user = os.getenv("ELASTIC_USER")

# aplicacion de elasticsearch funcionando localmente
elasticsearch_client = Elasticsearch(
    hosts=[{"host": "elasticsearch", "port": 9200, "scheme": "http"}],
    basic_auth=(elastic_user, elastic_password),
)
