import React from "react";
import { useState } from "react";
import { Button, Box, TextField, Pagination, PaginationItem, MenuItem, FormHelperText, FormControl, Select } from "@mui/material";
import axios from "axios";
import { LyricsResultList } from "../Components/LyricsResultList";

export function LyricsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchQuery !== "")
    // Change the URL and set the results correctly
      axios
        .get(
          `http://localhost:8080/elastic/search?query=${searchQuery}`
        )
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: '5%' }}>
      <Box component="form" onSubmit={handleSubmit} style={{ width: "50%", textAlign: "center" }}>
        <TextField
          focused
          label="Buscar letras"
          variant="outlined"
          value={searchQuery}
          color="success"
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '70%' }}
          InputProps={{
            style: { color: 'lightgrey' }
          }}
        />
        <Button type="submit" variant="contained" color="success" style={{ height: '100%', paddingLeft: '30px', paddingRight: '30px', marginLeft: '15px' }}>
          Buscar
        </Button>
      </Box>
      {results && 
        <div className="results-container">
          <div className="results-header">
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
        <LyricsResultList results={results} searchQuery={searchQuery} />
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
      }
    </div>
  );
}
