/**
 * Program for playing basic Tic-Tac-Toe
 *
 * @author chris.frank michael.felix tim.rose
 */

let board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let remainingMoves = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let turnCount = 1;
let currentTurn = 'X';
let oneOrTwoPlayer = 2;
let curPlayName = '';
let xName = '';
let yName = '';


/**
* Console based menu for user to select whether they want to play
* a two player game or against the computer.
*/

function startGamePlay() {
  ///1 or 2 player?
  console.log("Would you like to play a one or two player game? (Enter 1 or 2)");
  process.stdin.once('data', (oneOrTwo) => {
    oneOrTwo = oneOrTwo.toString().trim();
    if (isPlayerNumberValid(oneOrTwo)) {
      oneOrTwo = parseInt(oneOrTwo);
      oneOrTwoPlayer = oneOrTwo;
      console.log("Player X, what is your name?");
      process.stdin.once('data', (xName) => {
        xName = xName.toString().trim();
        console.log("Hello " + xName);
        if (oneOrTwoPlayer === 2) {
          console.log("Player Y, what is your name?");
          process.stdin.once('data', (yName) => {
            yName = yName.toString().trim();
            console.log("Hello " + yName);
            twoPlayerGame(xName, yName);
          }
          )
        } else if (oneOrTwoPlayer === 1) {
          onePlayerGame(xName);
        }

      })
    } else {
      startGamePlay()
    }

  })
}

/**
 * Fuction where one players plays against the computer.
 * for now the computer chooses random space from an array of remaining spaces
 */

function onePlayerGame(xName) {
  printBoard(board);
  console.log(xName + ' Please choose your next move. Choose one of the remaining numbers.')
  process.stdin.once('data', (move) => {
    move = move.toString().trim();
    if (isEntryValid(move)) {
      board[board.indexOf(move)] = 'X';
      remainingMoves = remainingMoves.filter(item => item !== move)
      if (checkVictory()) {
        console.log(xName + ' you won!!');
        printBoard(board);
        process.exit();
      }
      turnCount++;

      if (turnCount > 9) {
        console.log('It is a tie!!');
        printBoard(board);
        process.exit();
      }
      if (turnCount % 2 === 0) {
        ranSelection = getRandom(remainingMoves);
        board[board.indexOf(ranSelection)] = 'O';
        remainingMoves = remainingMoves.filter(item => item !== ranSelection)
        if (checkVictory()) {
          console.log('Ha Ha ' + xName + ' you have been defeated!!');
          printBoard(board);
          process.exit();
        }
        turnCount++;
      }
      onePlayerGame(xName);
    } else {
      onePlayerGame(xName);
    }
  });

}

/**
 * Fuction that acepts imput from the players on which box they want to chose
 * then updates counter and board array. 
 */

function twoPlayerGame(xName, yName) {
  printBoard(board);
  if (currentTurn === 'X') {
    curPlayName = xName;
  } else {
    curPlayName = yName;
  }

  console.log(curPlayName + ' please choose your next move. Choose one of the remaining numbers.')
  process.stdin.removeAllListeners('data');
  process.stdin.once('data', (move) => {
    move = move.toString().trim();
    if (isEntryValid(move)) {
      board[board.indexOf(move)] = currentTurn;
      if (checkVictory()) {
        console.log(curPlayName + ' you won!!');
        printBoard(board);
        process.exit();
      }
      turnCount++;
      if (turnCount > 9) {
        console.log('It is a tie!!');
        printBoard(board);
        process.exit();
      }
      if (turnCount % 2 !== 0) {
        currentTurn = 'X'
      } else {
        currentTurn = "O"
      }
      twoPlayerGame();
    } else {
      twoPlayerGame();
    }
  });

}

/**
 * Function to draw board in console.
 */

function printBoard(board) {
  console.log("           ")
  console.log(" " + board[0] + " | " + board[1] + " | " + board[2] + " ")
  console.log("---|---|---")
  console.log(" " + board[3] + " | " + board[4] + " | " + board[5] + " ")
  console.log("---|---|---")
  console.log(" " + board[6] + " | " + board[7] + " | " + board[8] + " ")
  console.log("           ")
}

/**
* Function to check if a player has won the game. Then updates board appropriately.
*/

function checkVictory() {
  if ((board[0] === board[1]) && (board[1] === board[2])) {      //if horizontal top row positions equal each other
    board[0] = '-'
    board[1] = '-'
    board[2] = '-'
    return true;
  }
  if ((board[3] === board[4]) && (board[4] === board[5])) {      //if horizontal middle row positions equal each other
    board[3] = '-'
    board[4] = '-'
    board[5] = '-'
    return true;
  }
  if ((board[6] === board[7]) && (board[7] === board[8])) {      //if horizontal bottom row positions equal each other
    board[6] = '-'
    board[7] = '-'
    board[8] = '-'
    return true;
  }
  if ((board[0] === board[3]) && (board[3] === board[6])) {      //if vertical left column positions equal each other
    board[0] = '|'
    board[3] = '|'
    board[6] = '|'
    return true;
  }
  if ((board[1] === board[4]) && (board[4] === board[7])) {      //if vertical middle column positions equal each other
    board[1] = '|'
    board[4] = '|'
    board[7] = '|'
    return true;
  }
  if ((board[2] === board[5]) && (board[5] === board[8])) {      //if vertical right column positions equal each other
    board[2] = '|'
    board[5] = '|'
    board[8] = '|'
    return true;
  }
  if ((board[0] === board[4]) && (board[4] === board[8])) {      //if diagonal top left to bottom right positions equal each other
    board[0] = '\\'
    board[4] = '\\'
    board[8] = '\\'
    return true;
  }
  if ((board[6] === board[4]) && (board[4] === board[2])) {      //if diagonal top right to bottom left positions equal each other
    board[6] = '/'
    board[4] = '/'
    board[2] = '/'
    return true;
  }
}

/**
* Checks if input from the user is valid for game play.
*/

function isEntryValid(text) {
  let regex1 = /[1-9]/

  if (!text.match(regex1)) {
    console.log('Please enter a number between 1 & 9');
    return false;
  }
  if (!board.includes(text)) {
    console.log('That space has already been taken please choose another.');
    return false;
  } else {
    return true;
  }
}

/**
* Random selection from an array of remaing boxes or moves.
*/

function getRandom(remainingMoves) {
  let ranSelection = remainingMoves[Math.floor(Math.random() * remainingMoves.length)];
  return ranSelection;
}

/**
* Checks if input from the user is valid regarding whether they want two player or play against the computer.
*/

function isPlayerNumberValid(oneOrTwo) {
  let regex2 = /[1-2]/

  if (!oneOrTwo.match(regex2)) {
    console.log("That is not a valid entry. Please try again.");
    return false;
  } else {
    return true;
  }
}
