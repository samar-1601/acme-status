// this function calculates the winner based on the selected cells on the board
export function CalculateWinner(squares: string[]): [string, number[]] {
  // an array of arrays containing the winning orientations
  const winningCombinations: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // the orientation of the square array is amongst one of the winning ones
  // we return the winner i.e X or O along with the winng orientation
  // which we will use for updating the winner and the CSS styling for the
  // winner row respectivelty
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], winningCombinations[i]];
    }
  }
  return ["", []];
}
