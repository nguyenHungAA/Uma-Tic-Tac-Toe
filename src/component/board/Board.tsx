
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import Square from '../square/Square';

import style from './Board.module.scss';
export default function Board({ isXNext, squares, onPlay }:
    { isXNext: boolean, squares: Array<string | null>, onPlay: (squares: Array<string | null>) => void }
) {
    const cx = classNames.bind(style);
    // AI Auto-play effect
    useEffect(() => {
        // Only play when it's O's turn, game isn't over, and there are empty squares
        if (!isXNext && !calculateWinner(squares) && squares.includes(null)) {
            const timer = setTimeout(() => {
                makeAIMove();
            }, 2000); // 1 second delay for better UX

            return () => clearTimeout(timer);
        }
    }, [isXNext, squares]);

    function makeAIMove() {
        const availableMoves = squares
            .map((square, index) => square === null ? index : null)
            .filter(index => index !== null) as number[];

        if (availableMoves.length > 0) {
            // Simple AI: Choose best move or random
            const bestMove = getBestMove(squares, availableMoves);
            handleSquareClick(bestMove);
        }
    }

    function getBestMove(currentSquares: Array<string | null>, availableMoves: number[]): number {
        // Strategy 1: Try to win
        for (const move of availableMoves) {
            const testSquares = currentSquares.slice();
            testSquares[move] = 'O';
            if (calculateWinner(testSquares) === 'O') {
                return move;
            }
        }

        // Strategy 2: Block opponent from winning
        for (const move of availableMoves) {
            const testSquares = currentSquares.slice();
            testSquares[move] = 'X';
            if (calculateWinner(testSquares) === 'X') {
                return move;
            }
        }

        // Strategy 3: Take center if available
        if (availableMoves.includes(4)) {
            return 4;
        }

        // Strategy 4: Take corners
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(corner => availableMoves.includes(corner));
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }

        // Strategy 5: Random move
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    function handleSquareClick(index: number) {
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
        return null;
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${isXNext ? 'X (Human)' : 'O (AI)'}`;
    }

    return <>
        <div className={cx('status')}>{status}</div>
        <div className={cx('board')}>
            <div className={cx('board-row')}>
                <Square id={0} value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
                <Square id={1} value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
                <Square id={2} value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
            </div>
            <div className={cx('board-row')}>
                <Square id={3} value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
                <Square id={4} value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
                <Square id={5} value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
            </div>
            <div className={cx('board-row')}>
                <Square id={6} value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
                <Square id={7} value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
                <Square id={8} value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
            </div>
        </div>
    </>
}