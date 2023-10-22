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

export function SearchView() {
  const items = {
    album: false,
    cancion: false,
    artista: false,
  };

  const [checkedItems, setCheckedItems] = useState(items);
  const [searchQuery, setSearchQuery] = useState("");
  const [mainSearch, setMainSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [musicGenre, setMusicGenre] = useState("");
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");

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

  return (
    <div className="sngs-containers" style={{ marginTop: "20px" }}>
      {results.length == 0 ? (
        <div className="sngs-containers">
          <Typography variant="h4" color="white">
            Search
          </Typography>
          <CheckboxGroup
            checkedItems={checkedItems}
            onChange={setCheckedItems}
          />
          <SearchField
            isDisabled={Object.values(checkedItems).every((item) => !item)}
            field={mainSearch}
            handleFieldChange={setMainSearch}
            placeholder="Search"
          />
          <SearchField
            isDisabled={false}
            field={musicGenre}
            handleFieldChange={setMusicGenre}
            placeholder="Search genre"
          />
          <SearchField
            isDisabled={!checkedItems.cancion}
            field={song}
            handleFieldChange={setSong}
            placeholder="Search song"
          />
          <SearchField
            isDisabled={!checkedItems.artista}
            field={artist}
            handleFieldChange={setArtist}
            placeholder="Search artist"
          />
          <div className="column-container">
            <Typography variant="body" color="white">
              From
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                size="small"
                value={fromYear}
                label="Year"
                onChange={(e) => setFromYear(e.target.value)}
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
                value={toYear}
                label="Year"
                onChange={(e) => setToYear(e.target.value)}
                style={{
                  background: "white",
                }}
              >
                <MenuItem value={""}></MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button
            disabled={Object.values(checkedItems).every((item) => !item)}
            variant="contained"
            color="success"
            size="large"
            style={{ marginTop: "10px" }}
          >
            Search
          </Button>
        </div>
      ) : (
        <div className="results-container">
          <div className="results-header">
            <SearchField
              field={searchQuery}
              handleFieldChange={setSearchQuery}
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
