import React from "react";
import { SongCard } from "./SongCard";

export function ResultList({ results }) {
  return (
    <div className="row-container ">
      {results.map((result) => {
        return (
          <SongCard
            header={result.header}
            subHeader={result.subHeader}
            body={result.body}
            imageURI={result.imageURI}
          />
        );
      })}
    </div>
  );
}
