import React, { useState, useEffect } from "react";
import "../Components/styles.css";
import { Typography, TextField } from "@mui/material";
import { ResultView } from "../Views/ResultView";
import Select from "@mui/material/Select";
import CheckboxGroup from "../Components/checkbox_group";
import { SearchField } from "../Components/SearchField";
import axios from "axios";
import { Button, FormControl, MenuItem } from "@mui/material";

export function SearchView() {
  const [checkedItems, setCheckedItems] = useState({
    album: false,
    track: false,
    artist: false,
  });
  const [formData, setFormData] = useState({
    query: "",
    genre: "",
    song: "",
    album: "",
    artist: "",
    start_year: "",
    end_year: "",
  });
  const [orderBy, setOrderBy] = useState("Relevancia");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e;
    setCurrentPage(1);
    setFormData({ ...formData, [name]: value });
  };

  const fetchResults = async () => {
    const tiposParam = Object.entries(checkedItems)
      .filter(([key, value]) => value)
      .map(([key]) => `types=${key}`)
      .join("&");

    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );

    const { query, ...rest } = filteredFormData;

    try {
      const response = await axios.get(
        `http://localhost:8080/spotify/search?query=${query}&${tiposParam}&limit=${pageSize}&offset=${
          (currentPage - 1) * pageSize
        }`,

        {
          params: {
            ...rest,
          },
        }
      );
      let resultAux = [];

      for (const type of Object.keys(checkedItems).filter(
        (item) => checkedItems[item]
      )) {
        const { data } = response;
        const { items } = data[`${type}s`];

        let typeResults;

        if (type === "album") {
          // Alfabetico, reciente
          if (orderBy === "Alfabetico")
            items.sort((a, b) => {
              return a["name"].localeCompare(b["name"]);
            });

          if (orderBy === "Reciente")
            items.sort((a, b) => {
              const dateA = new Date(a["release_date"]);
              const dateB = new Date(b["release_date"]);
              return dateA - dateB;
            });
        } else {
          // Alfabetico, Relevancia
          if (orderBy === "Alfabetico")
            items.sort((a, b) => {
              return a["name"].localeCompare(b["name"]);
            });

          if (orderBy === "Relevancia")
            items.sort((a, b) => b["popularity"] - a["popularity"]);
        }

        if (type === "album") {
          typeResults = items.map(processAlbum);
        } else if (type === "track") {
          typeResults = items.map(processTrack);
        } else if (type === "artist") {
          typeResults = items.map(processArtist);
        }

        resultAux.push(...typeResults);
      }
      setResults(resultAux);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchResults();
  };

  useEffect(() => {
    fetchResults();
  }, [currentPage, pageSize]);

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
  };

  const form = (
    <form onSubmit={handleSubmit}>
      <div className="sngs-containers">
        <CheckboxGroup checkedItems={checkedItems} onChange={setCheckedItems} />
        <SearchField
          isDisabled={Object.values(checkedItems).every((item) => !item)}
          field={formData.query}
          handleFieldChange={handleChange}
          name="query"
          placeholder="Search"
        />
        <SearchField
          isDisabled={
            !(checkedItems.track || checkedItems.artist) || checkedItems.album
          }
          // desabilitado si no esta checkeado ni track ni artist, o, si esta checkeado album
          field={formData.genre}
          handleFieldChange={handleChange}
          name="genre"
          placeholder="Filter by genre"
        />
        <SearchField
          isDisabled={!checkedItems.track}
          // desabilitado si no esta checkeado track
          field={formData.song}
          handleFieldChange={handleChange}
          name="song"
          placeholder="Filter by track"
        />
        <SearchField
          isDisabled={
            !(checkedItems.track || checkedItems.album) || checkedItems.artist
          }
          // desabilitado si no esta checkeado ni track ni album, o, si esta checkeado artils
          field={formData.album}
          handleFieldChange={handleChange}
          name="album"
          placeholder="Filter by album"
        />
        <SearchField
          isDisabled={false}
          // siempre habilitado
          field={formData.artist}
          handleFieldChange={handleChange}
          name="artist"
          placeholder="Filter by artist"
        />
        <div className="column-container">
          <Typography variant="body" color="white">
            From
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              size="small"
              value={formData.start_year}
              label="Year"
              onChange={(e) => handleChange(e)}
              style={{
                background: "white",
              }}
            >
              <MenuItem value={""}></MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body" color="white">
            To
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              size="small"
              value={formData.end_year}
              label="Year"
              onChange={(e) => handleChange(e)}
              style={{
                background: "white",
              }}
            >
              <MenuItem value={""}></MenuItem>
            </Select>
          </FormControl>
        </div>
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
            <MenuItem value="Alfabetico">Alfabetico</MenuItem>
          </Select>
        </div>
        <Button
          type="submit"
          disabled={Object.values(checkedItems).every((item) => !item)}
          variant="contained"
          color="success"
          size="large"
          style={{ marginTop: "10px" }}
        >
          Search
        </Button>
      </div>
    </form>
  );

  return (
    <div className="sngs-containers" style={{ marginTop: "20px" }}>
      {results.length === 0 ? (
        <div className="sngs-containers">
          <Typography variant="h4" color="white">
            Search
          </Typography>
          {form}
        </div>
      ) : (
        <div>
          <div className="sngs-containers">{form}</div>
          <div className="results-container">
            <ResultView
              currentPageSize={pageSize}
              handlePageSizeChange={(e) => setPageSize(e.target.value)}
              currentPage={currentPage}
              handlePageChange={(_, page) => setCurrentPage(page)}
              results={results}
              isFromElastic={false}
            />
          </div>
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
