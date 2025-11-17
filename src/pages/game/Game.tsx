import { useEffect, useRef, useState } from 'react';
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
    const [isViewingHistory, setIsViewingHistory] = useState(false);
    const [xMoves, setXMoves] = useState<number[]>([]);
    const [oMoves, setOMoves] = useState<number[]>([]);
    const [umaMessage, setUmaMessage] = useState<string>("Let's have a fun game, shall we?");

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const currentSquares = history[currentMove];
    const isXNext = currentMove % 2 === 0;
    const times = useRef(0);

    const navigate = useNavigate();

    useEffect(() => {
        setUpdateWinner(updateWinner);
    }, [updateWinner]);

    const generateUmaMessage = (playerMoves: number[], umaMoves: number[]) => {
        if (playerMoves.length === 0) {
            setUmaMessage("Can we start already? My coffee is getting cold...");
        } else if (playerMoves.length === 1) {
            setUmaMessage("Alright, my turn then...");
        }
        if (umaMoves.length > 2 && playerMoves.length >= 3) {
            setUmaMessage("Tachyon told me you are quite interesting... she wants you to be her guinea pig...");
        }
        times.current += 1;

        if (times.current > 5) {
            setUmaMessage("Make it quick, my friend is waiting...");
        }

        if (times.current > 10) {
            setUmaMessage("This is gonna take some time...isn't it?");
        }
    }

    useEffect(() => {
        generateUmaMessage(xMoves, oMoves);
    }, [xMoves, oMoves]);

    console.log(umaMessage);


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
        setXMoves([]);
        setOMoves([]);
    }

    function handlePlay(newSquares: Array<string | null>) {
        const playedIndex = newSquares.findIndex((square, index) =>
            square !== currentSquares[index] && square !== null
        );

        if (playedIndex === -1) return;

        const currentPlayerMoves = isXNext ? [...xMoves] : [...oMoves];

        currentPlayerMoves.push(playedIndex);

        const updatedSquares = [...newSquares];

        if (currentPlayerMoves.length > 3) {
            const oldestMoveIndex = currentPlayerMoves.shift();
            if (oldestMoveIndex !== undefined) {
                updatedSquares[oldestMoveIndex] = null;
            }
        }

        if (isXNext) {
            setXMoves(currentPlayerMoves);
        } else {
            setOMoves(currentPlayerMoves);
        }

        const nextHistory = [...history.slice(0, currentMove + 1), updatedSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(move: number) {
        setCurrentMove(move);
        setIsViewingHistory(move !== history.length - 1);
        if (move === 0) {
            setXMoves([]);
            setOMoves([]);
        }
    }

    const moves = history.map((squares, move) => {
        let description;
        console.log(squares);
        if (move > 0) {
            description = `Go to move #${move}`;
        } else {
            return;
        }
        return (
            <li
                className={cx('move-item')}
                key={move}>
                <button onClick={() => {
                    jumpTo(move);
                }}>{description}</button>
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

                    <p className={cx('uma-message')}>{umaMessage}</p>
                </div>
            </div>
            <div className={cx('game-container')}>
                <div className={cx('game-board')}>
                    <Board
                        isXNext={isXNext}
                        isViewingHistory={isViewingHistory}
                        squares={currentSquares}
                        onPlay={handlePlay}
                        currentPlayerName={isXNext ? user.firstName : data.data[0].attributes.name}
                        nextPlayerName={isXNext ? user.firstName : data.data[0].attributes.name}
                    />
                </div>
                <div className={cx('game-info')}>
                    <div>
                        {currentMove > 0 && <div style={{ display: 'flex' }}>
                            <button onClick={() => {
                                jumpTo(0);
                            }}>
                                Go to Game Start
                            </button>
                            <button onClick={() => {
                                jumpTo(history.length - 1);
                            }}>
                                Go to Latest Move
                            </button>
                        </div>}
                        <h3>Move list</h3>
                        <ol className={cx('move-list')}>
                            {renderMoreMoves()}
                        </ol>
                    </div>

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