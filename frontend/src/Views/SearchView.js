
import React, { useState, useEffect } from 'react';
import "../Components/styles.css";
import { Typography, TextField } from "@mui/material";
import { ResultView } from "../Views/ResultView";

export function SearchView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const results = [
    // {
    //   song: "Siempre Pienso en Ti",
    //   artist: "Easykid",
    //   album: "Darkera",
    //   imageURI: "https://unavatar.io/kikobeats",
    // },
    // {
    //   song: "Otra Vez",
    //   artist: "Easykid",
    //   album: "Darkera",
    //   imageURI: "https://unavatar.io/kikobeats",
    // },
  ];

  const fetchResults = async () => {
    
    // try {
    //   const response = await axios.get(
    //     `http://localhost:8080/spotify/search?query=${query}&${tiposParam}&limit=${pageSize}&offset=${(currentPage-1) * pageSize}`,
    //     {
    //       params: {
    //         ...rest,
    //       },
    //     }
    //   );
    //   let resultAux = [];
    //   for (const type of Object.keys(checkedItems).filter(
    //     (item) => checkedItems[item]
    //   )) {
    //     const { data } = response;
    //     const { items } = data[`${type}s`];

    //     let typeResults;

    //     if (type === "album") {
    //       typeResults = items.map(processAlbum);
    //     } else if (type === "track") {
    //       typeResults = items.map(processTrack);
    //     } else if (type === "artist") {
    //       typeResults = items.map(processArtist);
    //     }

    //     resultAux.push(...typeResults);
    //   }
      
    //   setResults(resultAux.filter((result) => result.header.startsWith(searchQuery)));
    // } catch (error) {
    //   console.error("Error al cargar los datos:", error);
    // }
  }

  useEffect(() => {
    fetchResults()
  }, [currentPage, pageSize]);

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
  };
  return (
    <div className="sngs-containers">
      {results.length == 0 ? (
        <div>
          <Typography variant="h4" color="white">
            Search
          </Typography>
        </div>
      ) : (
        <div className="results-container">
          <div className="results-header">
            <TextField
              variant="outlined"
              placeholder="Search song"
              value={searchQuery}
              onChange={(e) => handleSearchQueryChange(e.target.value)}
              size="small"
              style={{
                width: "fit-content",
                background: "white",
                borderRadius: "4px",
              }}
              InputProps={{
                style: { color: "black" },
              }}
            />
          </div>
          <ResultView
          currentPageSize={pageSize}
          handlePageSizeChange={ (e) => setPageSize(e.target.value) }
          currentPage={currentPage}
          handlePageChange={(_, page) => setCurrentPage(page)}
          results={results}
          isFromElastic={false}
          />
        </div>
      )}
    </div>
  );
}

const processAlbum = (item) => ({
  header: item.name,
  subHeader: item.artists[0].name,
  imageURI: item.images[0].url,
});

const processTrack = (item) => ({
  header: item.name,
  subHeader: item.artists[0].name,
  body: item.album.name,
  imageURI: item.album.images[0].url,
});

const processArtist = (item) => {
  const imageURI = item.images.length > 0 ? item.images[0].url : "";
  return {
    header: item.name,
    subHeader: item.type,
    imageURI,
  };
};
