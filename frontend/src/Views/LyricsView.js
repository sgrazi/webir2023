import React from "react";
import { useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import axios from "axios";

export function LyricsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(undefined);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Change the URL and set the results correctly
    axios
      .get(
        "http://localhost:8000/"
      )
      .then((response) => {
        setResults('DSADASDDAD');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", marginTop: '5%' }}>
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
      {results && <p>RESULT LIST HERE</p>}
    </div>
  );
}
