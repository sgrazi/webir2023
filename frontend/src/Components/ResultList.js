import React from "react";
import { SongCard } from "./SongCard";

export function ResultList({ results, searchQuery }) {
  return (
    <div className="row-container ">
      {results
        .filter((result) => result.header.startsWith(searchQuery))
        .map((result) => {
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
