import React, { useState, useEffect } from "react";
import "./TicTacToe.css";
import cross from "../Assets/x.png";
import circle from "../Assets/circle.png";

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(Array(9).fill(""));
  const [winnerText, setWinnerText] = useState("TicTacToe | Reactjs");

  useEffect(() => {
    const winner = checkWin(data);
    if (winner) {
      console.log("Winner detected:", winner);
      won(winner);
    }
  }, [data]);

  const toggle = (num) => {
    if (lock || data[num]) {
      return;
    }

    const newData = [...data];
    newData[num] = count % 2 === 0 ? "X" : "O";
    setData(newData);
    setCount(count + 1);

    console.log("Current Data:", newData);
  };

  const checkWin = (currentData) => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of winConditions) {
      if (currentData[a] && currentData[a] === currentData[b] && currentData[a] === currentData[c]) {
        console.log("Win detected at:", a, b, c);
        return currentData[a];
      }
    }
    return null;
  };

  const won = (winner) => {
    console.log("won function called");
    setLock(true);
    setWinnerText(`Congratulations: ${winner} Wins!`);
  };    

  const resetGame = () => {
    setCount(0);
    setData(Array(9).fill(""));
    setLock(false);
    setWinnerText("TicTacToe | Reactjs");
  };

  return (
    <div className="Container">
      <h1 className="Title">
        {winnerText}
      </h1>
      <div className="Board">
        <div className="Row1">
          {renderBox(0)}
          {renderBox(1)}
          {renderBox(2)}
        </div>
        <div className="Row2">
          {renderBox(3)}
          {renderBox(4)}
          {renderBox(5)}
        </div>
        <div className="Row3">
          {renderBox(6)}
          {renderBox(7)}
          {renderBox(8)}
        </div>
      </div>
      <button className="Reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );

  function renderBox(num) {
    return (
      <div className="Boxes" onClick={() => toggle(num)}>
        {data[num] === "X" && <img src={cross} alt="X" className="BoxImage" />}
        {data[num] === "O" && <img src={circle} alt="O" className="BoxImage" />}
      </div>
    );
  }
};

export default TicTacToe;