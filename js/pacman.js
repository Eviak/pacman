'use strict';
const PACMAN = '😷';

var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    };
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}


function movePacman(ev) {
    if (!gGame.isOn) return;
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];
    // return if cannot move
    if (nextCellContent === WALL) return;

    // hitting a ghost:
    // TODO :: check the condition for not super pacman.
    if (nextCellContent === GHOST) {
        hitGhost(nextLocation);
    };

    //EATING FOOD:
    if (nextCellContent === FOOD) {
        collectFood();
    }


    //EATING CHERRY:
    if (nextCellContent === CHERRY) {
        updateScore(10);
    }

    //EATING POWER FOOD:
    var lastColors = [];
    if (nextCellContent === POWER_FOOD) {
            //if already pacman super:
            if (gPacman.isSuper) {
                return
            }
            //if not:
            collectPowFood();
        }

        // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    // Move the pacmanK
    gPacman.location = nextLocation;
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the DOM
    renderCell(gPacman.location, PACMAN);
}

function collectPowFood() {
    var lastColors = [];

    //if NOT pacman super:
    gPacman.isSuper = true;
    for (let i = 0; i < gGhosts.length; i++) {
        lastColors.push(gGhosts[i].color);
        gTempGhosts = gGhosts.splice();

        gGhosts[i].color = 'blue';
    }
    setTimeout(() => {
        gPacman.isSuper = false
        for (let i = 0; i < gEatenGhosts.length; i++) {
            gGhosts.push(gEatenGhosts[i]);
            console.log(gEatenGhosts[i]);
        }
        for (let i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = lastColors[i];
        }
        gEatenGhosts = [];
    }, 5000)
}
// TODO : all the functions of ghosts should be at ghost.js && check the func
function hitGhost(nextLocation) {
    // if pacman super (true):
    if (gPacman.isSuper) {
        console.log('bye');
        console.log(nextLocation.i, nextLocation.j);
        var currGhost = getGhostByLoc(nextLocation);
        var splicedGhost = gGhosts.splice(gGhosts.indexOf(currGhost), 1)[0];
        gEatenGhosts.push(splicedGhost);

    } else {
    // if pacman not super (false)(GAME LOST):
        console.log('hi');
        gameOver(false);
        return;
    }
}

function collectFood() {
    updateScore(1);
    gFoodCounter--;
    if (gFoodCounter === -1) {
        gameOver(true);
    }
}

function getNextLocation(ev) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    };
    // figure out nextLocation
    switch (ev.key) {
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
    }

    return nextLocation;
}