exports.GetStepOfSquare = function (x, y, histories) {
    for (let i = 0; i < histories.length; i++){
        if (x === histories[i].currentX && y === histories[i].currentY)
            return histories[i].stepNumber;
    }

    return -1;
};

exports.CalculateWinner = function (x, y, squares) {
    const numToWin = 5;

    if (x === -1 || y === -1 || !squares)
        return null;

    let rows = squares.length;
    let cols = squares[0].length;
    let currentPlayer = squares[y][x];

    // row checking ------------------------------------------------
    let count = 1; // last play is one, now we check for the rest four points
    let skipGoBack = true;
    let skipGoToward = true;
    let winningSquares = [{x: x, y:y}];
    let i = 1;
    for (i = 1; i < numToWin; i++) {
        if (x - i >= 0 && squares[y][x - i] === currentPlayer && skipGoBack) {
            count++;
            winningSquares.push({
                x: x - i,
                y: y
            })
        }
        else {
            skipGoBack = false;
        }

        if (x + i < cols && squares[y][x + i] === currentPlayer && skipGoToward) {
            count++;
            winningSquares.push({
                x: x + i,
                y: y
            })
        }
        else {
            skipGoToward = false
        }
    }
    if (count === numToWin)
        return winningSquares;

    // column checking ------------------------------------------------
    count = 1; // last play is one, now we check for the rest four points
    winningSquares = [{x: x, y:y}];
    skipGoBack = true;
    skipGoToward = true;
    for (i = 1; i < numToWin; i++) {
        if (y - i >= 0 && squares[y - i][x] === currentPlayer && skipGoBack) {
            count++;
            winningSquares.push({
                x: x,
                y: y - i
            })
        }
        else {
            skipGoBack = false;
        }

        if (y + i < rows && squares[y + i][x] === currentPlayer && skipGoToward) {
            count++;
            winningSquares.push({
                x: x,
                y: y + i
            })
        }
        else {
            skipGoToward = false
        }
    }
    if (count === numToWin)
        return winningSquares;

    // cross 1 checking -- top left -> bot right ------------------------------------------------
    count = 1; // last play is one, now we check for the rest four points
    winningSquares = [{x: x, y:y}];
    skipGoBack = true;
    skipGoToward = true;
    for (i = 1; i < numToWin; i++) {
        if (y - i >= 0 && x - i >= 0 && squares[y - i][x - i] === currentPlayer && skipGoBack) {
            count++;
            winningSquares.push({
                x: x - i,
                y: y - i
            });
        }
        else {
            skipGoBack = false;
        }

        if (y + i < rows && x + i < cols && squares[y + i][x + i] === currentPlayer && skipGoToward) {
            count++;
            winningSquares.push({
                x: x + i,
                y: y + i
            });
        }
        else {
            skipGoToward = false
        }
    }
    if (count === numToWin)
        return winningSquares;

    // cross 2 checking -- bot left -> top right ------------------------------------------------
    count = 1; // last play is one, now we check for the rest four points
    winningSquares = [{x: x, y:y}];
    skipGoBack = true;
    skipGoToward = true;
    for (i = 1; i < numToWin; i++) {
        if (y + i < rows && x - i >= 0 && squares[y + i][x - i] === currentPlayer && skipGoBack) {
            count++;
            winningSquares.push({
                x: x - i,
                y: y + i
            });
        }
        else {
            skipGoBack = false;
        }

        if (y - i >= 0 && x + i < cols && squares[y - i][x + i] === currentPlayer && skipGoToward) {
            count++;
            winningSquares.push({
                x: x + i,
                y: y - i
            });
        }
        else {
            skipGoToward = false
        }
    }
    if (count === numToWin)
        return winningSquares;

    return null;
};