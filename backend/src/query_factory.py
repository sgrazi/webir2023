def make_elastic_lyric_query(query_string: str, orderBy: str, limit: int, offset: int):
    query = {"query": {"match": {"lyrics": query_string}}}
    query["from"] = offset
    query["size"] = limit
    if orderBy == "Popularidad":
        query["sort"] = [{"views": {"order": "desc"}}]
    elif orderBy == "Recientes":
        query["sort"] = [{"year": {"order": "desc"}}]
    return query


def make_elastic_artist_query(query_string: str, orderBy: str, limit: int, offset: int):
    query = {"query": {"match": {"artist": query_string}}}
    query["from"] = offset
    query["size"] = limit
    if orderBy == "Popularidad":
        query["sort"] = [{"views": {"order": "desc"}}]
    elif orderBy == "Recientes":
        query["sort"] = [{"year": {"order": "desc"}}]
    return query


def make_elastic_full_query(lyric: str, artist: str, orderBy: str, limit: int, offset: int):
    query = {
        "query": {
            "bool": {
                "must": [
                    {"match": {"lyrics": {"query": lyric, "boost": 2.0}}},
                    {"match": {"artist": artist}}
                ]
            }
        }
    }
    query["from"] = offset
    query["size"] = limit
    if orderBy == "Popularidad":
        query["sort"] = [{"views": {"order": "desc"}}]
    elif orderBy == "Recientes":
        query["sort"] = [{"year": {"order": "desc"}}]
    return query
