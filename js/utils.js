function printMat(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = 'cell cell-' + i + '-' + j;
            strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function foodCounterReset(board) {
    gFoodCounter = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === '.') gFoodCounter++;
        }
    }
}

function getGhostByLoc(nextLocation) {
    for (let i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === nextLocation.i &&
            gGhosts[i].location.j === nextLocation.j) {
              return gGhosts[i];
        }
    }
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function findEmptyCells() {
    var emptyCells = [];
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            if (isCellEmpty(i, j)) emptyCells.push({ i: i, j: j });
        }
    }
    // console.log(emptyCells);
    return emptyCells;
}

function isCellEmpty(i, j) {
    if (gBoard[i][j] === ' ') return true;
    else return false
}