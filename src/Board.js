import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn }) {
  const getTrueFalse = () => {
    const random = Math.floor(Math.random() * 2);
    return (random === 0 ? false : true);
  }

  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < nrows; y++) {
      let row = [];      
      for (let x = 0; x < ncols; x++) {
        const value = getTrueFalse();
        row.push(value);
      }  
      initialBoard.push(row);    
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    
    // console.log(board.some(subArr => subArr.includes(false)))
    // console.log((board.find(val => val[0] === false)));
    // return (board.find(val => val[0] === false)) ? false : true

    // return (board.includes("fds") ? true : false);
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = [...oldBoard]

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      console.log(board[y][x]);
      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()) {
    return <h1>"YOU WIN!"</h1>
  }


  // make table board

  // TODO
  let tableBoard = [];

  for (let y = 0; y < nrows; y++) {
    const row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
      <Cell
      key={coord}
      isLit={board[y][x]} 
      flipCellsAroundMe={() => flipCellsAround(coord)}
      />);
    }  
    tableBoard.push(<tr key={y}>{row}</tr>);    
  }
  return (
    <div>
      <h1>Lights Out!</h1>
      <table className="Board">
        <tbody>{tableBoard}</tbody>
      </table>
    </div>
  )
}

export default Board;
