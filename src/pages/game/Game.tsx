import { useState } from 'react';
import Board from "../../component/board/Board";
import classNames from 'classnames/bind';
import style from './Game.module.scss'
import { useNavigate, useParams } from 'react-router';
import { useUmaById } from '@/hooks/useUma';
import Loading from '@/component/loading/Loading';
import Button from '@/component/button/Button';
import ErrorComponent from '@/component/error/ErrorComponent';
function Game() {

    const cx = classNames.bind(style);
    const { id } = useParams();
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [showMoreMoves, setShowMoreMoves] = useState(false);
    const [updateWinner, setUpdateWinner] = useState<string | null>(null);
    const currentSquares = history[currentMove];
    const isXNext = currentMove % 2 === 0;

    const navigate = useNavigate();

    if (!id) {
        navigate('/');
    }

    const { data, error, isLoading } = useUmaById(id || '');

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (error) {
        return (
            <ErrorComponent
                message={`Error loading data: ${(error as unknown as Error)}`}
            />
        )
    }

    if (!data) {
        return (
            <div>
                Cant find uma with {id}
            </div>
        )
    }

    function handleRestartGame() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setUpdateWinner(null);
    }

    function handleSetWinner(childData: string | null) {
        setUpdateWinner(childData);
    }


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

    const renderMoreMoves = () => {
        if (moves.length > 3) {
            return (
                <>
                    {showMoreMoves ? moves : moves.slice(0, 3)}
                    <button onClick={() => setShowMoreMoves(!showMoreMoves)}>
                        {showMoreMoves ? 'Show Less' : 'Show More'}
                    </button>
                </>
            )
        }
        return moves;
    }

    return (
        <div className={cx('game')}>
            <div className={cx('uma-info')}>
                <div>
                    <img
                        className={cx('uma-avatar')}
                        src={data.data[0].attributes.avatar}
                        alt={data.data[0].attributes.name} />
                </div>
                <div className={cx('uma-text')}>
                    <h2>{data.data[0].attributes.name}</h2>
                    <h3>{data.data[0].attributes.title}</h3>
                </div>
            </div>
            <div className={cx('game-container')}>
                <div className={cx('game-board')}>
                    <Board
                        isXNext={isXNext}
                        squares={currentSquares}
                        onPlay={handlePlay}
                        nextPlayerName={isXNext ? 'Human' : data.data[0].attributes.name}
                        parentCallback={handleSetWinner}
                    />
                </div>
                <div className={cx('game-info')}>
                    <ol>
                        {renderMoreMoves()}
                    </ol>

                    {updateWinner && <div className={cx('game-button-container')}>
                        <Button
                            className={cx('game-button')}
                            onClick={handleRestartGame}
                            label='Restart Game'
                            primary={true}
                        />
                        <Button
                            className={cx('game-button')}
                            onClick={() => navigate('/uma-list')}
                            label='Choose Another Uma Musume'
                            primary={false}
                        />
                    </div>}

                </div>
            </div>
        </div>
    );


}

export default Game;