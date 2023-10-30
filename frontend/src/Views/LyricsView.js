import React, { useState, useEffect } from 'react';
import { Button, Box, TextField, Pagination, PaginationItem, MenuItem, FormHelperText, FormControl, Select } from "@mui/material";
import axios from "axios";
import { ResultView } from "../Views/ResultView";

export function LyricsView() {
  const maxAmmount = 10;

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const rangeValues = Array.from({ length: maxAmmount }, (_, i) => i + 1);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchResults()
  };

  const fetchResults = () => {
    if (searchQuery !== "")
    axios
      .get(
        `http://localhost:8080/elastic/search?query=${searchQuery}&limit=${pageSize}&offset=${(currentPage-1) * pageSize}`
      )
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchResults()
  }, [currentPage, pageSize]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: '5%' }}>
      {results == undefined ? (
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
      ) : (
        <ResultView
          searchQuery={searchQuery}
          handleFieldChange={ (e) => setSearchQuery(e.value) }
          currentPageSize={pageSize}
          handlePageSizeChange={ (e) => setPageSize(e.target.value) }
          currentPage={currentPage}
          handlePageChange={(_, page) => setCurrentPage(page)}
          results={results}
          isFromElastic={true}
        />
      )}
    </div>
  );
}
