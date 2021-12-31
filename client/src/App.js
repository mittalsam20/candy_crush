import { useEffect, useState } from "react";
import blueCandy from "./images/blue-candy.png";
import greenCandy from "./images/green-candy.png";
import orangeCandy from "./images/orange-candy.png";
import purpleCandy from "./images/purple-candy.png";
import redCandy from "./images/red-candy.png";
import yellowCandy from "./images/yellow-candy.png";
import blank from "./images/blank.png";

import "./App.css";

const App = () => {
  const [currentBoard, setCurrentBoard] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisp, setScoreDisp] = useState(0);
  const candyColors = [
    blueCandy,
    orangeCandy,
    purpleCandy,
    redCandy,
    yellowCandy,
    greenCandy,
  ];

  const width = 8;

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentBoard[i];

      if (
        columnOfThree.every((square) => currentBoard[square] === decidedColor)
      ) {
        setScoreDisp((score) => score + 3);
        columnOfThree.forEach((square) => (currentBoard[square] = blank));
        return true;
      }
    }
  };

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentBoard[i];

      if (
        columnOfFour.every((square) => currentBoard[square] === decidedColor)
      ) {
        setScoreDisp((score) => score + 4);
        columnOfFour.forEach((square) => (currentBoard[square] = blank));
        return true;
      }
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

      if (rowOfThree.every((square) => currentBoard[square] === decidedColor)) {
        setScoreDisp((score) => score + 3);
        rowOfThree.forEach((square) => (currentBoard[square] = blank));
        return true;
      }
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
      if (rowOfFour.every((square) => currentBoard[square] === decidedColor)) {
        setScoreDisp((score) => score + 4);
        rowOfFour.forEach((square) => (currentBoard[square] = blank));
        return true;
      }
    }
  };

  const moveSquareBelow = () => {
    for (let i = 0; i < 64 - width; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow && currentBoard[i] === blank) {
        let randomColor =
          candyColors[Math.floor(Math.random() * candyColors.length)];
        currentBoard[i] = randomColor;
      }

      if (currentBoard[i + width] === blank) {
        currentBoard[i + width] = currentBoard[i];
        currentBoard[i] = blank;
      }
    }
  };

  // console.log(scoreDisp, " sam");
  const dragStart = (e) => {
    // console.log("starting");
    // console.log(e.target);
    setSquareBeingDragged(e.target);
  };
  const dragDrop = (e) => {
    // console.log("Dropped");
    // console.log(e.target);
    setSquareBeingReplaced(e.target);
  };
  const dragEnd = (e) => {
    // console.log("Ended");
    // console.log(e.target);
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );

    currentBoard[squareBeingReplacedId] = squareBeingDragged.alt;
    currentBoard[squareBeingDraggedId] = squareBeingReplaced.alt;

    // console.log(squareBeingDraggedId, squareBeingReplacedId);

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const isValidMove = validMoves.includes(squareBeingReplacedId);
    // console.log(isValidMove);
    const isColFour = checkForColumnOfFour();
    const isRowFour = checkForRowOfFour();
    const isColThree = checkForColumnOfThree();
    const isRowThree = checkForRowOfThree();

    if (
      squareBeingReplacedId &&
      isValidMove &&
      (isRowThree || isRowFour || isColFour || isColThree)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentBoard[squareBeingReplacedId] = squareBeingReplaced.alt;
      currentBoard[squareBeingDraggedId] = squareBeingDragged.alt;
      setCurrentBoard([...currentBoard]);
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
    // console.log(currentBoard);
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
    }, 200);

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
              src={ele}
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
