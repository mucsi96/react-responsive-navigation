import React, { useState } from "react";
import "./App.css";
import { useWidth } from "./useWidth";
import { MeasureList } from "./MeasureList";

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
  const [itemDimensions, setItemDimensions] = useState<number[]>([]);
  const [ref, available] = useWidth();
  let occupied = 0;
  const cutIndex = itemDimensions.findIndex(width => {
    occupied += width;
    return occupied > available;
  });

  return (
    <div className="App">
      <header className="App-header" ref={ref}>
        {items
          .slice(0, cutIndex !== -1 ? cutIndex : undefined)
          .map((item: string, index: number) => (
            <span key={index}>
              <span className="App-item">{item}</span>
            </span>
          ))}
      </header>
      <MeasureList onMeasurement={setItemDimensions}>
        {({ ref }) => (
          <header className="App-header" ref={ref}>
            {items.map((item: string, index: number) => (
              <span key={index}>
                <span className="App-item">{item}</span>
              </span>
            ))}
          </header>
        )}
      </MeasureList>
      <button
        className="App-button"
        type="button"
        onClick={() =>
          setItems([...items, words[Math.floor(Math.random() * words.length)]])
        }
      >
        Add new
      </button>
      <header className="App-header">
        {items
          .slice(cutIndex !== -1 ? cutIndex : itemDimensions.length)
          .map((item: string, index: number) => (
            <span key={index}>
              <span className="App-item">{item}</span>
            </span>
          ))}
      </header>
    </div>
  );
};

export default App;
