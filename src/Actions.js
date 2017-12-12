const SetSquare = (x, y) => ({
    type: 'SET_SQUARE',
    action: {x, y}
});

const ReverseHistoryList = () => ({
    type: 'REVERSE_HISTORY_LIST',
    action: {}
});

const JumpTo = (step) => ({
    type: 'JUMP_TO',
    action: {step}
});

export default {SetSquare, ReverseHistoryList, JumpTo}