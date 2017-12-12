let Utils = require('./Utils');

let default_rows = 13;
let default_cols = 29;
let squares = new Array(default_rows).fill(null);
for (let i = 0; i < default_rows; i++) {
    squares[i] = new Array(default_cols).fill(null);
}

let default_state = {
    rows: default_rows,
    cols: default_cols,
    histories: [
        {
            rows: default_rows,
            cols: default_cols,
            squares: squares,
            stepNumber: 0,
            currentX: -1,
            currentY: -1,
            isXNext: true,
        }
    ],
    currentStep: 0,
    canPlay: true,
    winningSquares: [],
    isHistoryListSortAsc: true,
    selectedStep: -1
};

export default (state = default_state, action) => {
    switch (action.type) {
        case 'SET_SQUARE':
            let x = action.action.x;
            let y = action.action.y;

            if (!state.canPlay) {
                return state;
            }

            const histories = state.histories.slice(0, state.currentStep + 1);
            const current = histories[histories.length - 1];
            const squares = current.squares.slice();

            for (let i = 0; i < squares.length; i++){
                squares[i] = current.squares[i].slice();
            }

            if (squares[y][x]) {
                let selectedStep = Utils.GetStepOfSquare(x, y, histories);

                return {...state, selectedStep};
            }

            const isXNext = current.isXNext;
            squares[y][x] = isXNext ? 'X' : 'O';

            let new_step = state.currentStep + 1;
            let new_history_item = {
                rows: current.rows,
                cols: current.cols,
                squares: squares,
                stepNumber: new_step,
                currentX: x,
                currentY: y,
                isXNext: !isXNext
            };

            let res = {
                ...state,
                histories: histories.concat(new_history_item),
                currentStep: new_step,
                selectedStep: -1
            };

            let winningSquares = Utils.CalculateWinner(x, y, squares);
            if (winningSquares) {
                res.canPlay = false;
                res.winningSquares = winningSquares;
            }
            return res;

        case 'REVERSE_HISTORY_LIST':
            return {...state, isHistoryListSortAsc: !state.isHistoryListSortAsc};
            break;
        case 'JUMP_TO': {
            let step = action.action.step;

            if (step < state.histories.length - 1) { // is not the latest movement
                return {
                    ...state,
                    currentStep: step,
                    canPlay: true,
                    winningSquares: []
                };
            }
            else {
                return {
                    ...state,
                    currentStep: step,
                };
            }
        }
        default:
            return state
    }
}
