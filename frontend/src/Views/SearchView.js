import React from "react";
import { useState } from "react";
import "../Components/styles.css";
import { Button, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import PaginationItem from "@mui/material/PaginationItem";
import { ResultList } from "../Components/ResultList";
import Select from "@mui/material/Select";
import CheckboxGroup from "../Components/checkbox_group";
import { SearchField } from "../Components/SearchField";
import axios from "axios";

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
    artist: "",
    start_year: "",
    end_year: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e;
    setFormData({ ...formData, [name]: value });
  };

  const handelSearchQueryChange = (e) => {
    setSearchQuery(e.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        `http://localhost:8080/spotify/search?query=${query}&${tiposParam}`,
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

  return (
    <div className="sngs-containers" style={{ marginTop: "20px" }}>
      {results.length == 0 ? (
        <div className="sngs-containers">
          <Typography variant="h4" color="white">
            Search
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="sngs-containers">
              <CheckboxGroup
                checkedItems={checkedItems}
                onChange={setCheckedItems}
              />
              <SearchField
                isDisabled={Object.values(checkedItems).every((item) => !item)}
                field={formData.query}
                handleFieldChange={handleChange}
                name="query"
                placeholder="Search"
              />
              <SearchField
                isDisabled={false}
                field={formData.genre}
                handleFieldChange={handleChange}
                name="genre"
                placeholder="Search genre"
              />
              <SearchField
                isDisabled={!checkedItems.track}
                field={formData.song}
                handleFieldChange={handleChange}
                name="song"
                placeholder="Search song"
              />
              <SearchField
                isDisabled={!checkedItems.artist}
                field={formData.artist}
                handleFieldChange={handleChange}
                name="artist"
                placeholder="Search artist"
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
        </div>
      ) : (
        <div className="results-container">
          <div className="results-header">
            <SearchField
              field={searchQuery}
              handleFieldChange={handelSearchQueryChange}
              placeholder="Search"
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
