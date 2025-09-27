import React from "react";
import "./App.css";

const WORD_LENGTH = 5;

const Line = ({ guess, isFinal, solution }) => {
  const tiles = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i] || "";
    let className = "tile";

    if (isFinal) {
      if (char === solution[i]) {
        className += " correct"; // green
      } else if (char && solution.includes(char)) {
        className += " present"; // yellow
      } else if (char) {
        className += " absent"; // gray
      }
    }

    tiles.push(
      <div key={i} className={className}>
        {char}
      </div>
    );
  }

  return <div className="line">{tiles}</div>;
};

export default Line;
