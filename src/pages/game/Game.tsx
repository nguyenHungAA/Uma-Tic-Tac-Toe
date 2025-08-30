import { useState } from 'react';
import Board from "../../component/board/Board";
import classNames from 'classnames/bind';
import style from './Game.module.scss'
function Game() {

    const cx = classNames.bind(style);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const isXNext = currentMove % 2 === 0;

    function handlePlay(newSquares: Array<string | null>) {
        const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(move: number) {
        setCurrentMove(move);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = `Go to move #${move}`;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })

    return (
        <div className={cx('game')}>
            <div className={cx('game-board')}>
                <Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className={cx('game-info')}>
                <ol>
                    {moves}
                </ol>
            </div>
        </div>
    );


}

export default Game;