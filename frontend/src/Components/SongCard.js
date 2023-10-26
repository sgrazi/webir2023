import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export function SongCard({ song, artist, album, imageURI }) {
  return (
    <Card
      sx={{
        display: "flex",
        height: "60px",
        width: "400px",
        color: "black",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          paddingRight: "20px",
          gap: "40px",
          backgroundColor: "#2e2e2c",
          "&:hover": {
            opacity: 0.85,
          },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            objectFit: "contain",
            width: "auto",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
          image={imageURI}
          alt="Live from space album cover"
        />
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="body1" color="white">
            {song}
          </Typography>
          <Typography variant="body2" color="#B3B3B3" component="div">
            {artist}
          </Typography>
        </CardContent>
        <Typography variant="body2" color="#B3B3B3" component="div">
          {album}
        </Typography>
      </CardActionArea>
    </Card>
  );
}
