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

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentBoard[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (rowOfThree.every((square) => currentBoard[square] === decidedColor))
        rowOfThree.forEach((square) => (currentBoard[square] = " "));
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentBoard[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      if (notValid.includes(i)) continue;
      if (rowOfFour.every((square) => currentBoard[square] === decidedColor))
        rowOfFour.forEach((square) => (currentBoard[square] = " "));
    }
  };

  const moveSquareBelow = () => {
    for (let i = 0; i < 64 - width; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow && currentBoard[i] === " ") {
        let randomColor =
          candyColors[Math.floor(Math.random() * candyColors.length)];
        currentBoard[i] = randomColor;
      }

      if (currentBoard[i + width] === " ") {
        currentBoard[i + width] = currentBoard[i];
        currentBoard[i] = " ";
      }
    }
  };

  const dragStart = () => {
    console.log("starting");
  };
  const dragDrop = () => {
    console.log("Dropped");
  };
  const dragEnd = () => {
    console.log("Ended");
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
      checkForRowOfFour();
      checkForRowOfThree();
      moveSquareBelow();
      setCurrentBoard([...currentBoard]);
    }, 100);

    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    checkForRowOfFour,
    moveSquareBelow,
    currentBoard,
  ]);

  return (
    <div className="app">
      <div className="game">
        {currentBoard.map((ele, index) => {
          // console.log(ele);
          return (
            <img
              key={index}
              style={{ backgroundColor: ele }}
              alt={ele}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDragEnter={(e) => {
                e.preventDefault();
              }}
              onDragLeave={(e) => {
                e.preventDefault();
              }}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
