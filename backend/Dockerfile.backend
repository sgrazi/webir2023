FROM python:3.11.5

COPY requirements.txt /src/
WORKDIR /src

RUN export SPOTIPY_CLIENT_ID=961156e781c24ff0926e04ae66226978
RUN export SPOTIPY_CLIENT_SECRET=63acbb7f54b342a1801aea71a1ebce52

RUN pip install --no-cache-dir --upgrade -r /src/requirements.txt

COPY src/ /src

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]