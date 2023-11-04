import React from "react";
import { SongCard } from "./SongCard";

export function ResultList({ results }) {
  return (
    <div className="row-container ">
      {results
        .map((result) => {
          return (
            <SongCard
              song={result.song}
              artist={result.artist}
              album={result.album}
              imageURI={result.imageURI}
              key={result.song}
            />
          );
        })}
    </div>
  );
}
