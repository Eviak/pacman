'use strict';
const GHOST = '&#9781;';

var gIdCount = 1;
var gGhosts = [];
var gGhostsInterval;
var gEatenGhosts = [];
var gTempGhosts;

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3,
        },
        id: gIdCount++,
        color: getRandomColor(),
        currCellContent: FOOD,
        isEaten: false,
    };
    gGhosts.push(ghost);
    //model
    var strHtml = '';
    strHtml = `<span style="color:${ghost.color}">${GHOST}</span>`
    board[ghost.location.i][ghost.location.j] = strHtml;
}

// 3 ghosts and an interval
function createGhosts(board) {
    gGhosts = [];
    createGhost(board);
    createGhost(board);
    createGhost(board);
    gGhostsInterval = setInterval(moveGhosts, 1000);
}

// loop through ghosts
function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i]);
    }
}

function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff();

    //next ghost location:
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    };

    //next cell content for conditions and memory for later:
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];

    // Move conditions (return if can't move):
    if (nextCellContent === WALL) return;
    if (nextCellContent === GHOST) return;
    // Hitting pacman:
    if (nextCellContent === PACMAN) {
        // if pacman super (true):
        //TODO : handle this.
        if (gPacman.isSuper) console.log('hi');
        else {
            gameOver(false);
            return;
        }
    }

    // update old ghost spot with old content:
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;

    //update color in model:
    var strHtml = '';

    //TODO : switch to the func.
    strHtml = `<span style="color:${ghost.color}">${GHOST}</span>`

    renderCell(ghost.location, ghost.currCellContent);
    // Move the ghost to next location:
    ghost.location = nextLocation;
    ghost.currCellContent = nextCellContent;
    // update ghost in model to new location
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // update ghost in DOM to new location
    renderCell(ghost.location, strHtml);
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 };
    } else if (randNum < 50) {
        return { i: -1, j: 0 };
    } else if (randNum < 75) {
        return { i: 0, j: -1 };
    } else {
        return { i: 1, j: 0 };
    }
}

// TODO: render ghosts with this func and use a condition to set their color;
// function getGhostHTML(ghost) {
//     return `<span>${GHOST}</span>`;
// }