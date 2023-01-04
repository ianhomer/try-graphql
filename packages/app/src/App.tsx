import React from "react";
import "./App.css";
import Songs from "./Songs";

function App() {
  return (
    <div className="App">
      <header className="app">
        Try GraphQL
        <Songs />
      </header>
    </div>
  );
}

export default App;
