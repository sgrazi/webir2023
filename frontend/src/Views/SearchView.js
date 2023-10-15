import React from "react";
import { useState } from "react";
import "./styles.css";
import { Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import PaginationItem from "@mui/material/PaginationItem";
import { ResultList } from "../Components/ResultList";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

export function SearchView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                size="small"
                value={currentPage}
                onChange={(e) => setCurrentPage(e.target.value)}
                style={{
                  background: "white",
                }}
              >
                <MenuItem value={1}>1</MenuItem>
              </Select>
              <FormHelperText style={{ color: "white" }}>
                Select page
              </FormHelperText>
            </FormControl>
          </div>
          <ResultList results={results} searchQuery={searchQuery} />
          <Pagination
            count={10}
            page={currentPage}
            onChange={(e) => setCurrentPage(e.target.value)}
            style={{ display: "flex", justifyContent: "center" }}
            renderItem={(item) => (
              <PaginationItem {...item} style={{ color: "white" }} />
            )}
          />
        </div>
      )}
    </div>
  );
}
