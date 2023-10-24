import React, { useState, useEffect } from 'react';
import { Button, Box, TextField, Pagination, PaginationItem, MenuItem, FormHelperText, FormControl, Select } from "@mui/material";
import axios from "axios";
import { LyricsResultList } from "../Components/LyricsResultList";

export function LyricsView() {
  const maxAmmount = 10;

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentItems, setCurrentItems] = useState(undefined);

  const rangeValues = Array.from({ length: maxAmmount }, (_, i) => i + 1);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery !== "")
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

  useEffect(() => {
    if (results) {
      const indexOfLastItem = currentPage * pageSize;
      const indexOfFirstItem = indexOfLastItem - pageSize;
      const itemsToDisplay = results.slice(indexOfFirstItem, indexOfLastItem)
      setCurrentItems(itemsToDisplay);
    }
  }, [currentPage, pageSize, results]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: '5%' }}>
      <Box component="form" onSubmit={handleSubmit} style={{ width: "50%", textAlign: "center" }}>
        <TextField
          focused
          label="Buscar letras}"
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
      {currentItems &&
        <div className="results-container">
          <div className="results-header">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <FormHelperText style={{ color: "white" }}>
                Cantidad por pagina:
              </FormHelperText>
              <Select
                size="small"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(e.target.value)
                }}
                style={{
                  background: "white",
                }}
              >
                {rangeValues.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <LyricsResultList results={currentItems} searchQuery={searchQuery} />
          <Pagination
            count={4} // Total number of pages
            page={currentPage} // Current page
            onChange={(event, page) => setCurrentPage(page)}
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
