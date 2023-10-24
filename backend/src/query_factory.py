def make_elastic_lyric_query(query_string: str, limit: int, offset: int):
    query = {
        "query": {"match": {"lyrics": query_string}},
        "from": offset,
        "size": limit
    }
    return query
