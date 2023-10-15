import Button from "@mui/material/Button";
import { AppBar } from "@mui/material";
import Typography from "@mui/material/Typography";
import SpotifyLogo from "../assets/logo.png";

//  TODO: Add routing to navbar
const pages = [{ name: "Search" }, { name: "Lyrics" }];

export default function Navbar({ setCurrentView }) {
  return (
    <AppBar
      position="static"
      style={{
        background: "#000000",
      }}
    >
      <div className="nb-container">
        <img className="icons" src={SpotifyLogo} alt="" />
        <Typography variant="h5" color="white">
          Webir Spotify Lookup
        </Typography>
        {pages.map((page) => (
          <Button
            key={page.name}
            size={"large"}
            sx={{ color: "white" }}
            onClick={() => setCurrentView(page.name)}
          >
            {page.name}
          </Button>
        ))}
      </div>
    </AppBar>
  );
}
