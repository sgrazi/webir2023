import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export function LyricCard({ song, artist, lyrics, onClick }) {
  return (
      <Card
        sx={{
          display: "flex",
          height: "75px",
          color: "black",
          marginBottom: 1
        }}
        style={{ cursor: 'pointer' }}
        onClick={() => onClick(lyrics)}
      >
        <CardActionArea
          sx={{
            backgroundColor: "#1f1f1e",
            "&:hover": {
              opacity: 0.85,
            },
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="body1" color="white" style={{width:"70%"}} noWrap={true}>
              {song}
            </Typography>
            <Typography component="div" variant="body2" color="#B3B3B3" style={{width:"80%"}} noWrap={true}>
              {artist}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    
  );
}
