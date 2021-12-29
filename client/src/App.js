import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [currentBoard, setCurrentBoard] = useState([]);
  const candyColors = ["blue", "green", "red", "yellow", "orange", "yellow"];
  const width = 8;

  const checkForColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentBoard[i];

      if (
        columnOfThree.every((square) => currentBoard[square] === decidedColor)
      )
        columnOfThree.forEach((square) => (currentBoard[square] = " "));
    }
  };

  const checkForColumnOfFour = () => {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentBoard[i];

      if (columnOfFour.every((square) => currentBoard[square] === decidedColor))
        columnOfFour.forEach((square) => (currentBoard[square] = " "));
    }
  };

  const createBoard = () => {
    const myboard = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      myboard.push(randomColor);
    }
    setCurrentBoard(myboard);
    console.log(currentBoard);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForColumnOfThree();
      setCurrentBoard([...currentBoard]);
    }, 100);

    return () => clearInterval(timer);
  }, [checkForColumnOfFour, checkForColumnOfThree, currentBoard]);

  return (
    <div className="app">
      <div className="game">
        {currentBoard.map((ele, index) => {
          console.log(ele);
          return <img key={index} style={{ backgroundColor: ele }} alt={ele} />;
        })}
      </div>
    </div>
  );
};

export default App;
