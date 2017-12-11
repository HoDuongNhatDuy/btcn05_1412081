import React, {Component} from 'react';
import Board from './Board';
import './Caro.css';
import { connect } from 'react-redux'

class Caro extends React.Component {
    // jumpTo(step){
    //     if (step < this.props.histories.length - 1) { // is not the latest movement
    //         this.setState({
    //             currentStep: step,
    //             canPlay: true,
    //             winningSquares: []
    //         });
    //     }
    //     else {
    //         this.setState({
    //             currentStep: step,
    //         });
    //     }
    // }
    //
    // reverseHistoryList(){
    //     this.setState({
    //         isHistoryListSortAsc: !this.state.isHistoryListSortAsc
    //     });
    // }

    render() {
        let current_step = this.props.currentStep;
        let current_board = this.props.histories[current_step];

        let moves = this.props.histories.map((history, step) => {
            let selectedStep = this.props.selectedStep;
            let moveString = "Go to game start";
            if (history.currentX !== -1 && history.currentY !== -1){
                moveString = `Go to move #${step} (${history.currentX}, ${history.currentY})`
            }
            return (
                <li key={"move-" + history.currentX + "-" + history.currentY} className={selectedStep === step ? "selected" : "" }>
                    <button onClick={() => this.jumpTo(step)}>{moveString}</button>
                </li>
            );
        });
        if (this.props.isHistoryListSortAsc)
            moves = moves.reverse();

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        board={current_board}
                        winningSquares={this.props.winningSquares}
                        onClick={(x, y) => this.handleClick(x, y)}
                        isXNext={current_board.isXNext}
                    />
                </div>
                <div className="game-info">
                    <div className="sort-block">
                        <label className="switch">
                            <input type="checkbox" onClick={() => this.reverseHistoryList()} defaultChecked />
                            <span className="slider round"> </span>
                        </label>
                    </div>
                    <ul>{moves} </ul>
                </div>
            </div>
        );
    }
}

Caro = connect(function (state) {
    return {...state}
})(Caro);

export default Caro
