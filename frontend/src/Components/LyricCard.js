import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import VisibilityIcon from "@mui/icons-material/Visibility";

export function LyricCard({ song, artist, lyrics, year, views, onClick }) {
  return (
    <Card
      sx={{
        display: "flex",
        height: "75px",
        color: "black",
        marginBottom: 1,
      }}
      style={{ cursor: "pointer" }}
      onClick={() => onClick(lyrics)}
    >
      <CardActionArea
        sx={{
          backgroundColor: "#1f1f1e",
          "&:hover": {
            opacity: 0.85,
          },
          display: "flex", // Add this line to create a flex container
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row", // Make it a row
            justifyContent: "space-between", // Space between columns
            flex: "1 0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
            }}
          >
            <Typography component="div" variant="body1" color="white">
              {song}
            </Typography>
            <Typography component="div" variant="body2" color="#B3B3B3">
              {artist}
            </Typography>
          </div>
          <div style={{ textAlign: "right" }}>
            <Typography>Año: {year}</Typography>
            <Typography>Visitas: {views}</Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
