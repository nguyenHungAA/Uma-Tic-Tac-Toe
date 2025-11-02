
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import Square from '../square/Square';

import style from './Board.module.scss';

interface BoardProps {
    isXNext: boolean;
    isViewingHistory?: boolean;
    squares: Array<string | null>;
    onPlay: (squares: Array<string | null>) => void;
    currentPlayerName?: string;
    nextPlayerName?: string;
}

let winner;
export default function Board({ isXNext, squares, onPlay, currentPlayerName, nextPlayerName, isViewingHistory }:
    BoardProps
) {
    const cx = classNames.bind(style);

    useEffect(() => {
        if (!isXNext && !calculateWinner(squares) && squares.includes(null)) {
            const timer = setTimeout(() => {
                makeAIMove();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isXNext, squares]);


    function makeAIMove() {
        if (isViewingHistory) {
            return;
        }
        const availableMoves = squares
            .map((square, index) => square === null ? index : null)
            .filter(index => index !== null) as number[];

        if (availableMoves.length > 0) {
            const bestMove = getBestMove(squares, availableMoves);
            handleSquareClick(bestMove);
        }
    }

    function getBestMove(currentSquares: Array<string | null>, availableMoves: number[]): number {
        if (isViewingHistory) {
            return -1;
        }

        for (const move of availableMoves) {
            const testSquares = currentSquares.slice();
            testSquares[move] = 'O';
            if (calculateWinner(testSquares) === 'O') {
                return move;
            }
        }

        for (const move of availableMoves) {
            const testSquares = currentSquares.slice();
            testSquares[move] = 'X';
            if (calculateWinner(testSquares) === 'X') {
                return move;
            }
        }

        if (availableMoves.includes(4)) {
            return 4;
        }

        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(corner => availableMoves.includes(corner));
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }

        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    function handleSquareClick(index: number) {
        if (isViewingHistory) {
            return;
        }

        try {
            if (squares[index] || calculateWinner(squares)) {
                return;
            }

            const newSquares = squares.slice();
            if (isXNext) {
                newSquares[index] = 'X';
            } else {
                newSquares[index] = 'O';
            }
            onPlay(newSquares);
        } catch (error) {
            console.error('Error handling square click:', error);
        }
    }

    function calculateWinner(squares: Array<string | null>) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        let counter = 0;

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[b] && squares[c]) {
                counter++;
            }
        }
        return counter === lines.length ? 'Tie' : null;
    }

    winner = calculateWinner(squares);

    let status;
    if (winner !== null) {
        status = `Winner ${winner}`
    } else {
        status = `Next player: ${nextPlayerName !== 'Human' ? nextPlayerName : "Human"}`
    }

    return <>
        <div className={cx('status')}>{status}</div>
        <div className={cx('board')}>
            <div className={cx('board-row')}>
                <Square id={0} value={squares[0]} onSquareClick={() => handleSquareClick(0)} disabled={(nextPlayerName !== currentPlayerName) || isViewingHistory} />
                <Square id={1} value={squares[1]} onSquareClick={() => handleSquareClick(1)} disabled={(nextPlayerName !== currentPlayerName) || isViewingHistory} />
                <Square id={2} value={squares[2]} onSquareClick={() => handleSquareClick(2)} disabled={(nextPlayerName !== currentPlayerName) || isViewingHistory} />
            </div>
            <div className={cx('board-row')}>
                <Square id={3} value={squares[3]} onSquareClick={() => handleSquareClick(3)} disabled={(nextPlayerName !== currentPlayerName) || isViewingHistory} />
                <Square id={4} value={squares[4]} onSquareClick={() => handleSquareClick(4)} disabled={(nextPlayerName !== currentPlayerName) || isViewingHistory} />
                <Square id={5} value={squares[5]} onSquareClick={() => handleSquareClick(5)} disabled={(nextPlayerName !== currentPlayerName) || isViewingHistory} />
            </div>
            <div className={cx('board-row')}>
                <Square id={6} value={squares[6]} onSquareClick={() => handleSquareClick(6)} disabled={(nextPlayerName !== currentPlayerName) || isViewingHistory} />
                <Square id={7} value={squares[7]} onSquareClick={() => handleSquareClick(7)} disabled={(nextPlayerName !== currentPlayerName) || isViewingHistory} />
                <Square id={8} value={squares[8]} onSquareClick={() => handleSquareClick(8)} disabled={(nextPlayerName !== currentPlayerName) || isViewingHistory} />
            </div>
        </div>
    </>
}