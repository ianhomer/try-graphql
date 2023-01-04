import React from "react";
import "./App.css";
import Songs from "./Songs";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        Try GraphQL
        <Songs />
      </header>
    </div>
  );
}

export default App;
