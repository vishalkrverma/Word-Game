import { useEffect, useState } from "react";
import "./App.css";
import Line from "./Line";

const API_URL = "./data.json";
const WORD_LENGTH = 5;

function App() {
  const [solution, setSolution] = useState("hello"); // default word
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  // --- Handle Keyboard Input ---
  useEffect(() => {
    const handleType = (event) => {
      if (isGameOver) return;

     if (event.key === "Enter") {
  if (currentGuess.length !== WORD_LENGTH) return;

  const guessIndex = guesses.findIndex((val) => val == null);
  const newGuess = [...guesses];
  newGuess[guessIndex] = currentGuess; // lock the current row

  setGuesses(newGuess);
  setCurrentGuess(""); // this will now point to the *next row*

  if (currentGuess === solution) {
    setIsGameOver(true);
  } else if (guessIndex === guesses.length - 1) {
    setIsGameOver(true);
  }
  return;
}


      if (event.key === "Backspace") {
        setCurrentGuess((oldGuess) => oldGuess.slice(0, -1));
        return;
      }

      // Accept only single A-Z letters
      if (/^[a-zA-Z]$/.test(event.key)) {
        if (currentGuess.length < WORD_LENGTH) {
          setCurrentGuess((oldGuess) => oldGuess + event.key.toLowerCase());
        }
      }
    };

    window.addEventListener("keydown", handleType);
    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess, guesses, isGameOver, solution]);

  // --- Fetch word from data.json ---
  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await fetch(API_URL);
        const words = await response.json();
        const randomWord =
          words[Math.floor(Math.random() * words.length)];
        setSolution(randomWord.toLowerCase());
      } catch (err) {
        console.error("Failed to fetch word:", err);
      }
    };
    fetchWord();
  }, []);

  return (
    <>
      <div className="heading">
        <h1> Guess The Word 🧑‍💻 </h1>
        <div className="rule">
         <h3>For Correct: <span className="green"> Green Color</span></h3>
         <h3>For InCorrect: <span className="yellow"> Yellow Color</span></h3>
         <h3>For Absent: <span className="grey"> Grey Color</span></h3>
        </div>
      </div>
      <div className="board">
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex((val) => val == null);
          return (
            <Line
              key={i}
              guess={isCurrentGuess ? currentGuess : guess ?? ""}
              isFinal={!isCurrentGuess && guess != null}
              solution={solution}
            />
          );
        })}
      </div>

    {isGameOver && (
  <div className="game-over">
    {guesses.includes(solution) ? (
      <>
        <div>🎉 Congratulations! You guessed it! 🎉</div>
        <div className="confetti">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </>
    ) : (
      <>
        <div>❌ Better Luck Next Time! The word was <span className="solution">"{solution}"</span></div>
        <div style={{ marginTop: "10px" }}>
          {/* Clapping animation */}
          <span className="clap">👏</span>
          <span className="clap">👏</span>
          <span className="clap">👏</span>
        </div>
      </>
    )}
  </div>
)}

    </>
  );
}

export default App;
