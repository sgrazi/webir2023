import os
import pandas as pd
from elasticsearch import Elasticsearch
from itertools import islice
from dotenv import load_dotenv

load_dotenv()
elastic_password = os.getenv("ELASTIC_PASSWORD")
elastic_user = os.getenv("ELASTIC_USER")

df = pd.read_csv("./scripts/short_song_lyrics.csv")
es = Elasticsearch(
    hosts=[{"host": "localhost", "port": 9200, "scheme": "http"}],
    basic_auth=(elastic_user, elastic_password),
)

rows_to_process = 1000
for index, row in islice(df.iterrows(), 0, rows_to_process):
    print("working on index " + str(index) + " of " + str(rows_to_process))
    data_to_index = {
        "id": index,
        "title": row["title"],
        "artist": row["artist"],
        "lyrics": row["lyrics"],
        "year": int(row["year"]),
        "views": int(row["views"])
    }
    index_name = "songs"
    response = es.index(index=index_name, id=data_to_index["id"], body=data_to_index)
