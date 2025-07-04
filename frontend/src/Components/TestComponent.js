import { useState } from "react";
import { Button, Grid, Typography, Paper, Tooltip } from "@mui/material";
import axios from "axios";
import "./styles.css";
import CheckboxGroup from "./checkbox_group";

export function TestComponent() {
  const items = {
    album: false,
    cancion: false,
    artista: false,
  };

  const [checkedItems, setCheckedItems] = useState(items);

  const [song, setSong] = useState(undefined);
  const [artist, setArtist] = useState(undefined);
  const [imageURI, setImageURI] = useState(undefined);

  const queryBackend = () => {
    axios
      .get(
        "http://localhost:8000/test/spotify_track?artist=Billie Eilish&track=Bad Guy"
      )
      .then((response) => {
        setSong(response.data.tracks.items[0].name);
        setImageURI(response.data.tracks.items[0].album.images[0].url);
        setArtist(response.data.tracks.items[0].album.artists[0].name);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="row-container">
      <Tooltip title="q='artist:Billie Eilish track:Bad Guy', type='track'">
        <CheckboxGroup
          checkedItems={checkedItems}
          onChange={setCheckedItems}
        ></CheckboxGroup>
        <Button variant="outlined" color="success" onClick={queryBackend}>
          Do an API query
        </Button>
      </Tooltip>
      {song && imageURI ? (
        <div className="column-container">
          <Grid container style={{ width: "800px" }}>
            <Grid item xs={7}>
              <Paper
                elevation={3}
                style={{
                  backgroundColor: "#1DB954",
                  height: "100%",
                  flexDirection: "column",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h3" color="white">
                  {song}
                </Typography>
                <Typography variant="body1">{artist}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={5}>
              <Paper elevation={3} style={{ padding: "20px" }}>
                <img
                  src={imageURI}
                  alt="Album artwork"
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
