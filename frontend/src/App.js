import React from "react";
import { useState } from "react";
import "./App.css";
import "./Components/styles.css";
import Navbar from "./Components/Navbar";
import { LyricsView } from "./Views/LyricsView";
import { SearchView } from "./Views/SearchView";

function App() {
  const [currentView, setCurrentView] = useState("Lyrics");

  return (
    <div className="App">
      <Navbar className="navbar" setCurrentView={setCurrentView} />
      <div className="main-content">
        {currentView === "Lyrics" ? <LyricsView/> : <SearchView/>}
      </div>
    </div>
  );
}

export default App;
