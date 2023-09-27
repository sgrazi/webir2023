# Webir Spotify Lookup

Aplicacion para realizar lookups con la API de Spotify.

## Diseño

### Frontend

![UI con requisitos](diseño-front.jpg)

1. Selector de tipos, se indica que tipo de resultados se busca. Si no se selecciona por lo menos 1 el buscador no se habilita
2. Buscador principal para ingresar su query
3. Indicador de filtro no disponible. Tooltip que indica por que este input se desactivo
4. Filtros disponibles
5. Filtro por rango de años

![Resultados de query](diseño-front-resultados.jpg)

1. Indicador de limite de resultados
2. Paginación de resultados

### Backend

![Arquitectura](diseño-back.png)

## Setup

### Backend

Python [FastAPI](https://fastapi.tiangolo.com/)

Para instalar FastAPI

```
pip3 install fastapi uvicorn
```

Para levantar el backend

```
cd backend
uvicorn main:app --reload
```

### Frontend

Javascript React. Creado con [Create React App](https://facebook.github.io/create-react-app)

Para levantar el frontend

```
npm i
npm start
```

### Spotify

Se usa la libreria [Spotipy](https://spotipy.readthedocs.io/en/2.22.1/) para consumir la API de Spotify. Desde spotify se creó una aplicacion en el [dashboard de developer](https://developer.spotify.com/dashboard). Estas aplicaciones estan asociadas a una cuenta personal de Spotify, la actualmente utilizada se llama "Webir Spotify Lookup".

Para utilizar el cliente es necesario indicarle al ambiente dos valores `SPOTIPY_CLIENT_ID` y `SPOTIPY_CLIENT_SECRET`. En MacOS y Linux esto se hace usando los siguientes comandos

```
export SPOTIPY_CLIENT_ID=<valor>
export SPOTIPY_CLIENT_SECRET=<valor>
```

Para usar "Webir Spotify Lookup" los valores estan en `backend/clients/spotify_client.py``

### ElasticSearch

Se usa la [libreria de elasticsearch de Python](https://elasticsearch-py.readthedocs.io/). Aca una guia rapida de como hacer el setup localmente para que esta aplicacion lo pueda usar

1. Instalar elasticsearch de la [pagina oficial](https://www.elastic.co/downloads/elasticsearch)
2. Abrir el comprimido y ejecutar en una terminal el ejecutable `bin/elasticsearch`
3. Indexar los datos deseados. Por ejemplo se pueden tomar las primeras 1000 filas de [este dataset](https://www.kaggle.com/datasets/carlosgdcj/genius-song-lyrics-with-language-information) con este script:

```
import pandas as pd
from elasticsearch import Elasticsearch
from itertools import islice

df = pd.read_csv("./song_lyrics.csv")
es = Elasticsearch(
    hosts=["http://localhost:9200"], http_auth=(LOCAL_USER, LOCAL_PASS)
)
count = len(df)
for index, row in islice(df.iterrows(), 0, 1000):
    print("working on index " + str(index) + " of " + str(count))
    data_to_index = {
        "id": index,
        "title": row["title"],
        "artist": row["artist"],
        "lyrics": row["lyrics"],
    }
    index_name = "songs"
    response = es.index(index=index_name, id=data_to_index["id"], body=data_to_index)

```

4. Colocar tus credenciales locales en `.env` para asi, el backend puede usar el cliente de elasticsearch para hacer queries
