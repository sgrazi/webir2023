import React from "react";
import { useState, useEffect } from "react";
import { LyricCard } from "./LyricCard";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export function LyricsResultList({ results }) {
  const [lyrics, setLyric] = useState("");
  const [prevKey, setPrevKey] = useState(undefined);

  const toggleLyric = (key, newLyrics) => {
    if (key === prevKey) {
      setPrevKey(undefined);
      setLyric("");
    } else {
      setLyric(newLyrics);
      setPrevKey(key);
    }
  };

  useEffect(() => {
    setLyric("");
    setPrevKey(undefined);
  }, [results]);

  return (
    <div className="lyric-row-container ">
      <div className="lyric-column">
        {results.map((result) => {
          return (
            <LyricCard
              key={result._id}
              id={result._id}
              song={result._source.title}
              artist={result._source.artist}
              lyrics={result._source.lyrics}
              views={result._source.views}
              year={result._source.year}
              onClick={toggleLyric}
            />
          );
        })}
      </div>
      {prevKey ? (
        <Card
          sx={{
            marginLeft: 1,
            display: "flex",
            flex: 1,
          }}
        >
          <CardContent>
            <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
              {lyrics}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <></>
      )}
    </div>
  );
}
