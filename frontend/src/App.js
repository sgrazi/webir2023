import React from "react";
import { useState } from "react";
import { TestComponent } from "./Components/TestComponent";
import "./App.css";
import Navbar from "./Components/Navbar";
import { LyricsView } from "./Views/LyricsView";
import { SearchView } from "./Views/SearchView";

function App() {
  const [currentView, setCurrentView] = useState("");
  let view;

  switch (currentView) {
    case "Search":
      view = <SearchView />;
      break;
    case "Lyrics":
      view = <LyricsView />;
      break;
    default:
      view = <TestComponent />;
      break;
  }

  return (
    <div className="App">
      <Navbar className="navbar" setCurrentView={setCurrentView} />
      <div className="main-content">{view}</div>
    </div>
  );
}

export default App;
