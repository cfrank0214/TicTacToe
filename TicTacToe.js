/**
 * Program for playing basic Tic-Tac-Toe
 *
 * @author chris.frank michael.felix tim.rose
 */

let board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let availableSpace = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

let turnCount = 1;
let numberOfPlayers = 2;

let currentPlayerName = '';
let currentPlayersTurn = 'X';

let playerXName = '';
let playerOName = '';


/**
* Console based menu for user to select whether they want to play
* a two player game or against the computer.
*/
function startGamePlay() {
  console.log("Would you like to play a one or two player game? (Enter 1 or 2)");
  process.stdin.once('data', (input) => {
    userSelectionOneOrTwo = input.toString().trim();
    collectingPlayerName(userSelectionOneOrTwo);

  })
}

/**
* Asking users to input their name 
*/
function collectingPlayerName(numberOfPlayers) {
  if (isPlayerNumberValid(numberOfPlayers)) {
    numberOfPlayers = parseInt(numberOfPlayers);
    console.log("Player X, what is your name?");
    process.stdin.once('data', (input) => {
      playerXName = input.toString().trim();
      console.log("Hello " + playerXName);
      gameType(numberOfPlayers);
    });
  }
  else {
    // return to start menu if invalid data
    startGamePlay();
  }
}

/**
* Selection one to two player game. 
*/
function gameType(numberOfPlayers) {
  if (numberOfPlayers === 2) {
    console.log("Player O, what is your name?");
    process.stdin.once('data', (input) => {
      playerOName = input.toString().trim();
      console.log("Hello " + playerOName);
      twoPlayerGame(playerXName, playerOName);
    });
  }
  else if (numberOfPlayers === 1) {
    onePlayerGame(playerXName);
  }
}

/**
 * Fuction where one players plays against the computer.
 * for now the computer chooses random space from an array of remaining spaces
 */
function onePlayerGame(playerXName) {
  printBoard(board);
  console.log(playerXName + ' p8lease choose your next move. Choose one of the remaining numbers.')
  process.stdin.once('data', (move) => {
    move = move.toString().trim();
    if (isEntryValid(move)) {
      board[board.indexOf(move)] = 'X';
      availableSpace = availableSpace.filter(item => item !== move)
      if (checkVictory()) {
        console.log(playerXName + ' you won!!');
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
        ranSelection = getRandom(availableSpace);
        board[board.indexOf(ranSelection)] = 'O';
        availableSpace = availableSpace.filter(item => item !== ranSelection)
        if (checkVictory()) {
          console.log('Ha Ha ' + playerXName + ' you have been defeated!!');
          printBoard(board);
          process.exit();
        }
        turnCount++;
      }
      onePlayerGame(playerXName);
    } else {
      onePlayerGame(playerXName);
    }
  });

}

/**
 * Fuction that accepts input from the players on which box they want to chose
 * then updates counter and board array. 
 */
function twoPlayerGame(playerXName, playerOName) {
  printBoard(board);
  if (currentPlayersTurn === 'X') {
    currentPlayerName = playerXName;
  } else {
    currentPlayerName = playerOName;
  }
  console.log(currentPlayerName + ' please choose your next move. Choose one of the remaining numbers.')
  process.stdin.removeAllListeners('data');
  process.stdin.once('data', (input) => {
    currentPositionSelection = input.toString().trim();
    if (isEntryValid(currentPositionSelection)) {
      board[board.indexOf(currentPositionSelection)] = currentPlayersTurn;
      if (checkVictory()) {
        console.log(currentPlayerName + ' you won!!');
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
        currentPlayersTurn = 'X'
      } else {
        currentPlayersTurn = "O"
      }
      twoPlayerGame(playerXName, playerOName);
    } else {
      twoPlayerGame(playerXName, playerOName);
    }
  });

}

/**
 * Function that draws board in console.
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
  if (topRowWin()) {     
    return true;
  }
  if (middleRowWin()) {      
    horizontalCrossOut(3);
    return true;
  }
  if (bottomRowWin()) {      
    horizontalCrossOut(6);
    return true;
  }
  if (leftColumnWin()) {      
    verticalCrossOut(0);
    return true;
  }
  if (middleColumnCrossOut()) {     
    verticalCrossOut(1);
    return true;
  }
  if (rightColumnCrossOut()) {      
    verticalCrossOut(2);
    return true;
  }
  if (topLeftBottomRightCrossOut()) {      
    board[0] = '\\'
    board[4] = '\\'
    board[8] = '\\'
    return true;
  }
  if (topRightBottomLeftCrossOut()) {     
    board[6] = '/'
    board[4] = '/'
    board[2] = '/'
    return true;
  }
}

/**
* These functions cross out the winning combination
*/
function horizontalCrossOut(index) {
  board[index] = '-';
  board[index+1] = '-';
  board[index+2] = '-';
}

function topRowWin() {
  return (board[0] === board[1]) && (board[1] === board[2]);
}

function middleRowWin() {
  return (board[3] === board[4]) && (board[4] === board[5]);
}

function bottomRowWin() {
  return (board[6] === board[7]) && (board[7] === board[8]);
}

function verticalCrossOut(index) {
  board[index] = '|';
  board[index+3] = '|';
  board[index+6] = '|';
}

function leftColumnWin() {
  return (board[0] === board[3]) && (board[3] === board[6]);
}

function middleColumnCrossOut() {
  return (board[1] === board[4]) && (board[4] === board[7]);
}

function rightColumnCrossOut() {
  return (board[2] === board[5]) && (board[5] === board[8]);
}

function topRightBottomLeftCrossOut() {
  return (board[6] === board[4]) && (board[4] === board[2]);
}

function topLeftBottomRightCrossOut() {
  return (board[0] === board[4]) && (board[4] === board[8]);
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

function getRandom(availableSpace) {
  let ranSelection = availableSpace[Math.floor(Math.random() * availableSpace.length)];
  return ranSelection;
}

/**
* Checks if input from the user is valid regarding whether they want two player or play against the computer.
*/

function isPlayerNumberValid(userSelectionOneOrTwo) {
  let regex2 = /[1-2]/

  if (!userSelectionOneOrTwo.match(regex2)) {
    console.log("That is not a valid entry. Please try again.");
    return false;
  } else {
    return true;
  }
}

console.log("Tic Tac Toe, three in a row!!");
startGamePlay();