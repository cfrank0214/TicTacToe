/**
 * Program for playing basic Tic-Tac-Toe
 *
 * @author chris.frank michael.felix tim.rose
 */

let board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let availableSpace = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

let turnCount = 1;
let numberOfPlayers = 1;

let currentPlayer = '';
let playerSymbol = 'X';
let playerXName = '';
let playerOName = '';

let playerXNameElement = document.getElementById('playerXName')
let playerONameElement = document.getElementById('playerOName')
let numberOfPlayersElement = document.getElementById('numberOfPlayers')
let submitButtonElement = document.getElementById('submitButton')
let onePlayer = document.getElementById('onePlayer')
let twoPlayers = document.getElementById('twoPlayers')
let cells = document.getElementsByClassName("box");

/**
* Gets page ready to play game
*/
function startGamePlay() {
  for (var box of cells) {
    box.addEventListener("click", humansTurn);  // Adds Event listeners to each grid cell. 
  }
  say("Would you like to play against the computer or two player game?");
  printBoard(board);
}

/**
 * Updates the value of the cells on the board 
 */
function printBoard(board) {
  for (var box of cells) {
    box.textContent = board[box.id - 1];
  }
}

/**
 * Updates text message written below board. 
 */
function say(message) {
  document.getElementById('output').textContent = message;
}

/**
 * Updates UI based on 1 or 2 player Game.
 */
function checkPlayers() {
  if (onePlayer.checked) {
    playerXNameElement.className = ''
    playerONameElement.className = 'hidden'
  }
  else if (twoPlayers.checked) {
    playerXNameElement.className = ''
    playerONameElement.className = ''
    numberOfPlayers = 2
  }
}

/**
 * Sets varialbes like player names and number of players. 
 */
function submitButton() {
  playerXName = document.querySelector('#playerXName input').value
  playerOName = document.querySelector('#playerOName input').value
  playerXNameElement.className = 'hidden'
  playerONameElement.className = 'hidden'
  numberOfPlayersElement.className = 'hidden'
  submitButtonElement.className = 'hidden'
  say(playerXName + ' please choose your next move. Choose one of the remaining numbers.')
}

function humansTurn(event) {
  let currentBox = event.target.id
  board[currentBox - 1] = playerSymbol;
  availableSpace = availableSpace.filter(item => item !== currentBox)
  printBoard(board);
  proccesTurn(currentPlayer);
}

function computersTurn() {
  currentPlayer = 'The Computer'
  ranSelection = getRandom(availableSpace);
  board[board.indexOf(ranSelection)] = 'O';
  availableSpace = availableSpace.filter(item => item !== ranSelection)
  printBoard(board);
  proccesTurn(currentPlayer);
}

/**
 * Fuction where one players plays against the computer.
 * for now the computer chooses random space from an array of remaining spaces
 */
function proccesTurn() {
  if (checkVictory()) {
    say(currentPlayer + ' won!!');
    numberOfPlayers = 3;

  }
  turnCount++;
  if (turnCount > 9) {
    say('It is a tie!!');
    numberOfPlayers = 3;
  } else {
    if (onePlayerComputerTurn()) {
      computersTurn();

    }
    if (onePlayerHumanTurn()) {
      currentPlayer = playerXName;
      playerSymbol = 'X'
      say(currentPlayer + ' please choose your next move. Choose one of the remaining numbers.')
    }
    if (twoPlayerOsTurn()) {
      currentPlayer = playerOName;
      playerSymbol = 'O'
      say(currentPlayer + ' please choose your next move. Choose one of the remaining numbers.')
    }
    if (twoPlayerXsTurn()) {
      currentPlayer = playerXName;
      playerSymbol = 'X'
      say(currentPlayer + ' please choose your next move. Choose one of the remaining numbers.')
    }
  }
}

function twoPlayerXsTurn() {

  return numberOfPlayers === 2 && turnCount % 2 !== 0;
}

function twoPlayerOsTurn() {

  return numberOfPlayers === 2 && turnCount % 2 === 0;
}

function onePlayerHumanTurn() {

  return numberOfPlayers === 1 && turnCount % 2 !== 0;
}

function onePlayerComputerTurn() {

  return numberOfPlayers === 1 && turnCount % 2 === 0;
}

/**
* Functions to check if a player has won the game. Then updates board appropriately.
*/
function checkVictory() {
  if (topRowWin()) {
    return true;
  }
  if (middleRowWin()) {

    return true;
  }
  if (bottomRowWin()) {
    return true;
  }
  if (leftColumnWin()) {
    return true;
  }
  if (middleColumnWin()) {
    return true;
  }
  if (rightColumnWin()) {
    return true;
  }
  if (topLeftBottomRightWin()) {
    return true;
  }
  if (topRightBottomLeftWin()) {
    return true;
  }
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


function leftColumnWin() {
  return (board[0] === board[3]) && (board[3] === board[6]);
}

function middleColumnWin() {
  return (board[1] === board[4]) && (board[4] === board[7]);
}

function rightColumnWin() {
  return (board[2] === board[5]) && (board[5] === board[8]);
}

function topRightBottomLeftWin() {
  return (board[6] === board[4]) && (board[4] === board[2]);
}

function topLeftBottomRightWin() {
  return (board[0] === board[4]) && (board[4] === board[8]);
}

/**
* Random selection from an array of remaing boxes or moves.
*/
function getRandom(availableSpace) {
  let ranSelection = availableSpace[Math.floor(Math.random() * availableSpace.length)];
  return ranSelection;
}