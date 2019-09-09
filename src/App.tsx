import React, { useState } from "react";
import "./App.css";
import { useWidth } from "./useWidth";

const words = Array.from(
  new Set(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. A lacus vestibulum sed arcu non odio. Semper eget duis at tellus
    at urna condimentum mattis. Tortor condimentum lacinia quis vel eros donec ac. Volutpat blandit
    aliquam etiam erat velit scelerisque in dictum non. Mauris ultrices eros in cursus turpis. Aenean
    euismod elementum nisi quis eleifend quam. Enim lobortis scelerisque fermentum dui faucibus in ornare
    quam. Semper viverra nam libero justo laoreet sit. Purus viverra accumsan in nisl nisi scelerisque eu
    ultrices vitae. Sem fringilla ut morbi tincidunt augue interdum velit. Tincidunt tortor aliquam nulla
    facilisi cras fermentum.`
      .replace(/\./g, "")
      .split(" ")
      .filter(word => word.length > 5)
  )
);

const App: React.FC = () => {
  const [items, setItems] = useState<string[]>(["Lorem"]);
  const [ref, width] = useWidth();

  return (
    <div className="App">
      <header className="App-header" ref={ref}>
        {items.map((item: string, index: number) => (
          <span key={index}>
            <span className="App-item">{item}</span>
          </span>
        ))}
      </header>
      <button
        className="App-button"
        type="button"
        onClick={() =>
          setItems([...items, words[Math.floor(Math.random() * words.length)]])
        }
      >
        Add new
      </button>
      <p>{`Current width: ${width}px`}</p>
    </div>
  );
};

export default App;
