import React, { useState, useEffect } from 'react';
import "../Components/styles.css";
import { Button, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CheckboxGroup from "../Components/checkbox_group";
import { SearchField } from "../Components/SearchField";
import { ResultView } from "../Views/ResultView";
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
  const [results, setResults] = useState(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const handleChange = (e) => {
    const { name, value } = e;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchResults()
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
        `http://localhost:8080/spotify/search?query=${query}&${tiposParam}&limit=${pageSize}&offset=${(currentPage-1) * pageSize}`,
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
      
      setResults(resultAux.filter((result) => result.header.startsWith(searchQuery)));
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  }

  useEffect(() => {
    fetchResults()
  }, [currentPage, pageSize]);

  return (
    <div className="sngs-containers" style={{ marginTop: "20px" }}>
      {results == undefined ? (
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
        <ResultView
          searchQuery={searchQuery}
          handleFieldChange={ (e) => setSearchQuery(e.value) }
          currentPageSize={pageSize}
          handlePageSizeChange={ (e) => setPageSize(e.target.value) }
          currentPage={currentPage}
          handlePageChange={(_, page) => setCurrentPage(page)}
          results={results}
          isFromElastic={false}
        />
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
