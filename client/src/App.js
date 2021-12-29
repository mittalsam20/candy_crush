import { useEffect, useState } from 'react'
import './App.css'

const App = () => {

  const [currentBoard,setCurrentBoard]=useState([]);
  const width = 8
  const candyColors = ['blue', 'green', 'red', 'yellow', 'orange', 'yellow']

  const createBoard = () => {
    const myboard=[]
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
myboard.push(randomColor);
    }
    setCurrentBoard(myboard);
    console.log(currentBoard)
  }

useEffect(()=>{
  createBoard();
},[])


  return <div className="app">
    <div className="game">
{currentBoard.map((ele,index)=>{
console.log(ele);
return(
<img key={index} style={{backgroundColor:ele}}  />

  )

})}      
    </div>
  </div>
}

export default App
