/**
 * Program for playing basic Tic-Tac-Toe
 *
 * @author chris.frank michael.felix tim.rose
 */

let board = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
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

  say("Would you like to play against the computer or two player game?");
  printBoard(board);
}

/**
 * Updates the value of the cells on the board 
 */
function printBoard(board) {
  for (var box of cells) {
    box.innerHTML = board[box.id - 1];
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
  playerXNameElement.className = ''
  if (onePlayer.checked) {
    playerONameElement.className = 'hidden'
    numberOfPlayers = 1
  }
  else if (twoPlayers.checked) {
    playerONameElement.className = ''
    numberOfPlayers = 2
  }
}

/**
 * Sets varialbes like player names and number of players. 
 */
function submitButton() {
  for (var box of cells) {
    box.addEventListener("click", humansTurn);  // Adds Event listeners to each grid cell. 
  }
  playerXName = document.querySelector('#playerXName input').value
  playerOName = document.querySelector('#playerOName input').value
  if (playerXName === '') {
    say('Player one please enter your name.')
  } else {
    currentPlayer = playerXName
    playerXNameElement.className = 'hidden'
    playerONameElement.className = 'hidden'
    numberOfPlayersElement.className = 'hidden'
    submitButtonElement.className = 'hidden'
    say(playerXName + ' please choose your next move. Choose one of the remaining numbers.')
  }

}

function humansTurn(event) {
  let currentBox = event.target.id
  board[currentBox - 1] = playerSymbol;
  availableSpace = availableSpace.filter(item => item !== currentBox)
  printBoard(board);
  processTurn(currentPlayer);
}

function computersTurn() {
  currentPlayer = 'The Computer'
  ranSelection = getRandom(availableSpace);
  board[ranSelection - 1] = playerSymbol;
  availableSpace = availableSpace.filter(item => item !== ranSelection)
  printBoard(board);
  processTurn(currentPlayer);
}

/**
 * Fuction where one players plays against the computer.
 * for now the computer chooses random space from an array of remaining spaces
 */
function processTurn() {

  if (checkVictory()) {
    setTimeout(function(){ say(currentPlayer + ' won!!'); });
    
  }
  turnCount++;

  if (turnCount > 10) {
    setTimeout(function(){ say('It is a tie!!'); });
  } else {
    if (onePlayerComputerTurn()) {
      playerSymbol = 'O'
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
  if ((board[0] === board[1]) && (board[1] === board[2]) && (board[1] === 'X' || board[1] === 'O')) {
    document.getElementById('1').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('1').style["color"] = 'rgb(7, 7, 7)';
    document.getElementById('2').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('2').style["color"] = 'rgb(7, 7, 7)';
    document.getElementById('3').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('3').style["color"] = 'rgb(7, 7, 7)';
    return true;
  };
}

function middleRowWin() {
  if ((board[3] === board[4]) && (board[4] === board[5]) && (board[4] === 'X' || board[4] === 'O')) {
    document.getElementById('4').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('4').style["color"] = 'rgb(7, 7, 7)';
    document.getElementById('5').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('5').style["color"] = 'rgb(7, 7, 7)';
    document.getElementById('6').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('6').style["color"] = 'rgb(7, 7, 7)';
    return true;
  }
}

function bottomRowWin() {
  if ((board[6] === board[7]) && (board[7] === board[8]) && (board[7] === 'X' || board[7] === 'O')) {
    document.getElementById('7').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('7').style["color"] = 'rgb(7, 7, 7)';
    document.getElementById('8').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('8').style["color"] = 'rgb(7, 7, 7)';
    document.getElementById('9').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('9').style["color"] = 'rgb(7, 7, 7)';
    return true;
  }
}


function leftColumnWin() {
  if ((board[0] === board[3]) && (board[3] === board[6]) && (board[3] === 'X' || board[3] === 'O')) {
    document.getElementById('1').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('1').style["color"] = 'rgb(7, 7, 7)';
    document.getElementById('4').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('4').style["color"] = 'rgb(7, 7, 7)';
    document.getElementById('7').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('7').style["color"] = 'rgb(7, 7, 7)';
    return true;
  }
}

function middleColumnWin() {
  if ((board[1] === board[4]) && (board[4] === board[7]) && (board[4] === 'X' || board[4] === 'O')) {
    document.getElementById('2').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('2').style["color"] = 'rgb(7, 7, 7)';
    document.getElementById('5').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('5').style["color"] = 'rgb(7, 7, 7)';
    document.getElementById('8').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('8').style["color"] = 'rgb(7, 7, 7)';
    return true;
  }
}

function rightColumnWin() {
  if ((board[2] === board[5]) && (board[5] === board[8]) && (board[5] === 'X' || board[5] === 'O')) {
    document.getElementById('3').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('3').style["color"] = 'rgb(7, 7, 7)';
    document.getElementById('6').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('6').style["color"] = 'rgb(7, 7, 7)';
    document.getElementById('9').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('9').style["color"] = 'rgb(7, 7, 7)';
    return true;
  }
}

function topRightBottomLeftWin() {
  if ((board[6] === board[4]) && (board[4] === board[2]) && (board[4] === 'X' || board[4] === 'O')) {
    document.getElementById('7').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('7').style["color"] = 'rgb(7, 7, 7)';
    document.getElementById('5').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('5').style["color"] = 'rgb(7, 7, 7)';
    document.getElementById('3').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('3').style["color"] = 'rgb(7, 7, 7)';
    return true;
  }
}

function topLeftBottomRightWin() {
  if ((board[0] === board[4]) && (board[4] === board[8]) && (board[4] === 'X' || board[4] === 'O')) {
    document.getElementById('1').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('1').style["color"] = 'rgb(7, 7, 7)';
    document.getElementById('5').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('5').style["color"] = 'rgb(7, 7, 7)';
    document.getElementById('9').style["background-color"] = 'rgb(243, 6, 6)';
    document.getElementById('9').style["color"] = 'rgb(7, 7, 7)';
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