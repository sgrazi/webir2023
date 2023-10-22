def make_elastic_lyric_query(query_string: str):
    return {"query": {"match": {"lyrics": query_string}}}
