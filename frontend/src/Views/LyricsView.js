import React from "react";
import { useState } from "react";
import {
  Button,
  Box,
  TextField,
  Pagination,
  PaginationItem,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { LyricsResultList } from "../Components/LyricsResultList";

export function LyricsView() {
  const [lyricQuery, setLyricQuery] = useState("");
  const [artistQuery, setArtistQuery] = useState("");
  const [orderBy, setOrderBy] = useState("Relevancia");
  const [results, setResults] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    let query = "";
    if (lyricQuery !== "") query = `lyric=${lyricQuery}`;
    if (artistQuery !== "")
      query === ""
        ? (query = `artist=${artistQuery}`)
        : (query += `artist=${artistQuery}`);

    if (query !== "")
      // Change the URL and set the results correctly
      axios
        .get(`http://localhost:8080/elastic/search?${query}&orderBy=${orderBy}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "5%",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
        }}
      >
        <TextField
          focused
          label="Buscar letras"
          variant="outlined"
          value={lyricQuery}
          color="success"
          onChange={(e) => setLyricQuery(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <TextField
          label="Buscar letras de un artista"
          variant="outlined"
          value={artistQuery}
          color="success"
          onChange={(e) => setArtistQuery(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            width: "100%",
          }}
        >
          <Typography style={{ color: "#1db954" }} variant="body1">
            Ordenar Por
          </Typography>
          <Select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
            style={{ width: "100%" }}
            color="success"
          >
            <MenuItem value="Relevancia">Relevancia</MenuItem>
            <MenuItem value="Recientes">Recientes</MenuItem>
            <MenuItem value="Popularidad">Popularidad</MenuItem>
          </Select>
        </div>
        <Button type="submit" variant="contained" color="success">
          Buscar
        </Button>
      </Box>
      {results && (
        <div className="results-container">
          <LyricsResultList results={results} />
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
