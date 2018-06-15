/**
 * Program for playing basic Tic-Tac-Toe
 *
 * @author chris.frank michael.felix tim.rose
 */

let board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let remainingMoves = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let turnCount = 1;
let currentTurn = 'X';
let numberOfPlayers = 2;
let currentPlayerName = '';
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
    if (isPlayerNumberValid(userSelectionOneOrTwo)) {
      userSelectionOneOrTwo = parseInt(userSelectionOneOrTwo);
      numberOfPlayers = userSelectionOneOrTwo;
      console.log("Player X, what is your name?");
      process.stdin.once('data', (playerXName) => {
        playerXName = playerXName.toString().trim();
        console.log("Hello " + playerXName);
        if (numberOfPlayers === 2) {
          console.log("Player O, what is your name?");
          process.stdin.once('data', (playerOName) => {
            playerOName = playerOName.toString().trim();
            console.log("Hello " + playerOName);
            twoPlayerGame(playerXName, playerOName);
          }
          )
        } else if (numberOfPlayers === 1) {
          onePlayerGame(playerXName);
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

function onePlayerGame(playerXName) {
  printBoard(board);
  console.log(playerXName + ' Please choose your next move. Choose one of the remaining numbers.')
  process.stdin.once('data', (move) => {
    move = move.toString().trim();
    if (isEntryValid(move)) {
      board[board.indexOf(move)] = 'X';
      remainingMoves = remainingMoves.filter(item => item !== move)
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
        ranSelection = getRandom(remainingMoves);
        board[board.indexOf(ranSelection)] = 'O';
        remainingMoves = remainingMoves.filter(item => item !== ranSelection)
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
 * Fuction that acepts imput from the players on which box they want to chose
 * then updates counter and board array. 
 */

function twoPlayerGame(playerXName, playerOName) {
  printBoard(board);
  if (currentTurn === 'X') {
    currentPlayerName = playerXName;
  } else {
    currentPlayerName = playerOName;
  }

  console.log(currentPlayerName + ' please choose your next move. Choose one of the remaining numbers.')
  process.stdin.removeAllListeners('data');
  process.stdin.once('data', (move) => {
    move = move.toString().trim();
    if (isEntryValid(move)) {
      board[board.indexOf(move)] = currentTurn;
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
        currentTurn = 'X'
      } else {
        currentTurn = "O"
      }
      twoPlayerGame(playerXName, playerOName);
    } else {
      twoPlayerGame(playerXName, playerOName);
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