'use strict';
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const POWER_FOOD = '🧆';
const CHERRY = '&#127826;';

var gFoodCounter;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
};

function init() {
    gBoard = buildBoard();
    createGhosts(gBoard);
    createPacman(gBoard);
    // createPowerFoods (gBoard);
    foodCounterReset(gBoard)
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    setInterval(rndCherryToBoard, 15000);
    console.log(gBoard);
    console.log(gGhosts);
}



function restartGame() {
    //Hiding modal:
    var elGameOverModal = document.querySelector('.game-over-modal');
    elGameOverModal.style.visibility = 'hidden';

    //Updating score counter:
    gGame.score = 0; //model
    updateScore(0); //DOM

    gGame.isOn = true
    init();
}

function rndCherryToBoard() {
    var emptyCells = findEmptyCells();

    //if no empty cells yet:
    if (!emptyCells.length) return;

    // console.log(emptyCells[0]);
    var rndEmptyCellIdx = getRandomIntInclusive(0, emptyCells.length - 1);

    //cherry model update:
    gBoard[emptyCells[rndEmptyCellIdx].i][emptyCells[rndEmptyCellIdx].j] = CHERRY;

    //cherry DOC update:
    // var strHtml = CHERRY;
    renderCell(emptyCells[rndEmptyCellIdx], CHERRY)
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if (i === 1 && j === 1 ||
                i === 1 && j === SIZE - 2 ||
                i === SIZE - 2 && j === 1 ||
                i === SIZE - 2 && j === SIZE - 2) {
                board[i][j] = POWER_FOOD;
            }
        }
    }
    return board;
}

function updateScore(diff) {
    // model
    gGame.score += diff;

    //dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
}

function gameOver(isWin) {
    gGame.isOn = false;

    //clearing ghost movemeant interval:
    clearInterval(gGhostsInterval);
    gGhostsInterval = null;

    //Play again button html for modal:
    var strHtml = '</br><button onclick = "restartGame();">play again!</button>';

    // //show hidden modal:
    // var elGameOverModal = document.querySelector('.game-over-modal');
    // elGameOverModal.style.visibility = 'visible';

    gBoard = []; //reset gboard

    printMat(gBoard, '.board-container'); //render empty board
    if (isWin) {
        //show hidden modal:
        var elGameOverModal = document.querySelector('.game-over-modal');
        elGameOverModal.style.visibility = 'visible';
        elGameOverModal.innerHTML = 'You WON!' + strHtml;
    }
    if (!isWin) {
        //show hidden modal:
        var elGameOverModal = document.querySelector('.game-over-modal');
        elGameOverModal.style.visibility = 'visible';
        elGameOverModal.innerHTML = 'You lose!' + strHtml;
    }

}