import React from "react";
import { useState, useEffect } from "react";
import { LyricCard } from "./LyricCard";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export function LyricsResultList({ results }) {
  const [lyrics, setLyric] = useState("");

  const toggleLyric = (lyrics) => {
    setLyric(lyrics);
  };

  useEffect(() => {
    setLyric("");
  }, [results]);

  return (
    <div className="lyric-row-container ">
      <div className="lyric-column">
        {results.map((result) => {
          return (
            <LyricCard
              key={result._id}
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
        <Card
            sx={{
              marginLeft: 1,
              display: "flex",
              flex: 1,
            }}>
            <CardContent>
              <Typography variant="body1">{lyrics}</Typography>
            </CardContent>
          </Card>
    </div>
  );
}
