import { useEffect, useRef, useState } from 'react';
import Board from "../../component/board/Board";
import classNames from 'classnames/bind';
import style from './Game.module.scss'
import { useNavigate, useParams } from 'react-router';
import { useUmaById } from '@/hooks/useUma';
import Loading from '@/component/loading/Loading';
import Button from '@/component/button/Button';
import ErrorComponent from '@/component/error/ErrorComponent';
import type { Dialogue } from '@/types/Uma';

function Game() {
    const cx = classNames.bind(style);
    const { id } = useParams();
    const navigate = useNavigate();

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [xMoves, setXMoves] = useState<number[]>([]);
    const [oMoves, setOMoves] = useState<number[]>([]);
    const [updateWinner, setUpdateWinner] = useState<string | null>(null);

    const [showMoreMoves, setShowMoreMoves] = useState(false);
    const [isViewingHistory, setIsViewingHistory] = useState(false);
    const [umaMessage, setUmaMessage] = useState<string>("");

    const totalMovesPlayed = useRef(0);
    const lastMessageTrigger = useRef<string>('');

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const currentSquares = history[currentMove];
    const isXNext = currentMove % 2 === 0;

    const { data, error, isLoading } = useUmaById(id || '');

    useEffect(() => {
        if (!id) {
            navigate('/');
        }
    }, [id, navigate]);

    useEffect(() => {
        if (!data?.data[0]?.attributes?.dialouges) return;

        const dialogues = data.data[0].attributes.dialouges;
        const totalMoves = xMoves.length + oMoves.length;

        const getRandomDialogue = (trigger: string): string => {
            const dialogue = dialogues.find((d: Dialogue) => d.triggers === trigger);
            if (!dialogue?.lines?.length) return '';

            const randomIndex = Math.floor(Math.random() * dialogue.lines.length);
            return dialogue.lines[randomIndex] || '';
        };

        const determineMessageTrigger = (): string => {

            if (updateWinner) {
                if (updateWinner === 'Tie') {
                    return 'gameTie';
                } else if (updateWinner === 'X') {
                    return 'botLose';
                } else if (updateWinner === 'O') {
                    return 'botWin';
                }
            }

            if (totalMoves === 0 && totalMovesPlayed.current === 0) {
                return 'gameStart';
            }

            if (totalMovesPlayed.current > 10) {
                return 'veryLongGamePlay';
            }

            if (totalMovesPlayed.current > 5) {
                return 'longGamePlay';
            }

            if (xMoves.length >= 3 && oMoves.length >= 3 && updateWinner !== null) {
                return 'fillInConversation';
            }

            if (xMoves.length === 1 && oMoves.length === 0) {
                return 'botFirstPlay';
            }

            if (updateWinner === user.firstName) {
                return 'botLose';
            }

            if (updateWinner === data.data[0].attributes.name) {
                return 'botWin';
            }

            return '';
        };

        const trigger = determineMessageTrigger();

        if (trigger && (trigger !== lastMessageTrigger.current || trigger === 'gameStart')) {
            const message = getRandomDialogue(trigger);
            if (message) {
                setUmaMessage(message);
                lastMessageTrigger.current = trigger;

                if (trigger !== 'gameStart') {
                    totalMovesPlayed.current += 1;
                }
            }
        }
    }, [xMoves, oMoves, data, updateWinner]);

    if (isLoading) return <Loading />;

    if (error) {
        return (
            <ErrorComponent
                message={`Error loading data: ${error}`}
            />
        );
    }

    if (!data?.data[0]) {
        return (
            <div>Can't find uma with id: {id}</div>
        );
    }

    const umaData = data.data[0].attributes;

    const handleRestartGame = () => {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setUpdateWinner(null);
        setXMoves([]);
        setOMoves([]);
        setIsViewingHistory(false);
        setShowMoreMoves(false);

        totalMovesPlayed.current = 0;
        lastMessageTrigger.current = '';
        setUmaMessage('');
    };

    const handleWinner = (winner: string | null) => {
        if (winner && winner !== updateWinner) {
            setUpdateWinner(winner);
        }
    };

    const handlePlay = (newSquares: Array<string | null>) => {
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
        setIsViewingHistory(false);
    };

    const jumpTo = (move: number) => {
        setCurrentMove(move);
        setIsViewingHistory(move !== history.length - 1);

        if (move === 0) {
            setXMoves([]);
            setOMoves([]);
        } else {
            const newXMoves: number[] = [];
            const newOMoves: number[] = [];

            for (let i = 1; i <= move; i++) {
                const prevSquares = history[i - 1];
                const currSquares = history[i];

                const playedIndex = currSquares.findIndex((square, index) =>
                    square !== prevSquares[index] && square !== null
                );

                if (playedIndex !== -1) {
                    const playerMoves = (i - 1) % 2 === 0 ? newXMoves : newOMoves;
                    playerMoves.push(playedIndex);

                    if (playerMoves.length > 3) {
                        playerMoves.shift();
                    }
                }
            }

            setXMoves(newXMoves);
            setOMoves(newOMoves);
        }
    };

    const moves = history.slice(1).map((_, index) => {
        const move = index + 1;
        return (
            <li className={cx('move-item')} key={move}>
                <button onClick={() => jumpTo(move)}>
                    Go to move #{move}
                </button>
            </li>
        );
    });

    const renderMoveList = () => {
        if (moves.length === 0) {
            return <li>No moves yet</li>;
        }

        if (moves.length > 3) {
            const visibleMoves = showMoreMoves ? moves : moves.slice(0, 3);
            return (
                <>
                    {visibleMoves}
                    <li>
                        <button onClick={() => setShowMoreMoves(!showMoreMoves)}>
                            {showMoreMoves ? 'Show Less' : 'Show More'}
                        </button>
                    </li>
                </>
            );
        }

        return moves;
    };

    return (
        <div className={cx('game')}>
            <div className={cx('uma-info')}>
                <div>
                    <img
                        className={cx('uma-avatar')}
                        src={umaData.avatar}
                        alt={umaData.name}
                    />
                </div>
                <div className={cx('uma-text')}>
                    <h2>{umaData.name}</h2>
                    <h3>{umaData.title}</h3>
                    <p
                        style={{ background: umaData.themeColor }}
                        className={cx('uma-message')}>{umaMessage}</p>
                </div>
            </div>

            <div className={cx('game-container')}>
                <div className={cx('game-board')}>
                    <Board
                        isXNext={isXNext}
                        isViewingHistory={isViewingHistory}
                        squares={currentSquares}
                        onPlay={handlePlay}
                        onWinnerChange={handleWinner}
                        currentPlayerName={isXNext ? user.firstName : umaData.name}
                        nextPlayerName={isXNext ? umaData.name : user.firstName}
                    />
                </div>

                <div className={cx('game-info')}>
                    <div>
                        {(isViewingHistory || currentMove > 0) && (
                            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                                <Button
                                    primary
                                    label='Go to Game Start'
                                    onClick={() => jumpTo(0)}
                                    className={cx('game-button')}

                                />
                                <Button
                                    label='Go to Latest Move'
                                    onClick={() => jumpTo(history.length - 1)}
                                    className={cx('game-button')}
                                />
                            </div>
                        )}

                        <h3>Move list</h3>
                        <ol className={cx('move-list')}>
                            {renderMoveList()}
                        </ol>
                    </div>

                    {updateWinner && (
                        <div className={cx('game-button-container')}>
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Game;