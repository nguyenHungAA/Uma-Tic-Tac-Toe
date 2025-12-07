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

    // Game state
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [xMoves, setXMoves] = useState<number[]>([]);
    const [oMoves, setOMoves] = useState<number[]>([]);
    const [updateWinner, setUpdateWinner] = useState<string | null>(null);

    // UI state
    const [showMoreMoves, setShowMoreMoves] = useState(false);
    const [isViewingHistory, setIsViewingHistory] = useState(false);
    const [umaMessage, setUmaMessage] = useState<string>("");

    // Refs for tracking game progress
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

    // Uma message system
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
            // Game start - only show once at the beginning
            if (totalMoves === 0 && totalMovesPlayed.current === 0) {
                return 'gameStart';
            }

            // Very long game (prioritize over long game)
            if (totalMovesPlayed.current > 10) {
                return 'veryLongGamePlay';
            }

            // Long game
            if (totalMovesPlayed.current > 5) {
                return 'longGamePlay';
            }

            // Both players have made multiple moves (conversation phase)
            if (xMoves.length >= 3 && oMoves.length >= 3) {
                return 'fillInConversation';
            }

            // Bot's first move response
            if (xMoves.length === 1 && oMoves.length === 0) {
                return 'botFirstPlay';
            }

            return '';
        };

        const trigger = determineMessageTrigger();

        // Only update message if we have a new trigger or it's gameStart
        if (trigger && (trigger !== lastMessageTrigger.current || trigger === 'gameStart')) {
            const message = getRandomDialogue(trigger);
            if (message) {
                setUmaMessage(message);
                lastMessageTrigger.current = trigger;

                // Only increment counter for actual gameplay moves (not gameStart)
                if (trigger !== 'gameStart') {
                    totalMovesPlayed.current += 1;
                }
            }
        }
    }, [xMoves, oMoves, data]);

    // Loading and error states
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

    // Game actions
    const handleRestartGame = () => {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setUpdateWinner(null);
        setXMoves([]);
        setOMoves([]);
        setIsViewingHistory(false);
        setShowMoreMoves(false);

        // Reset message tracking
        totalMovesPlayed.current = 0;
        lastMessageTrigger.current = '';
        setUmaMessage('');
    };

    const handlePlay = (newSquares: Array<string | null>) => {
        // Find the newly played square
        const playedIndex = newSquares.findIndex((square, index) =>
            square !== currentSquares[index] && square !== null
        );

        if (playedIndex === -1) return;

        // Update current player's moves
        const currentPlayerMoves = isXNext ? [...xMoves] : [...oMoves];
        currentPlayerMoves.push(playedIndex);

        const updatedSquares = [...newSquares];

        // Remove oldest move if player exceeds 3 moves
        if (currentPlayerMoves.length > 3) {
            const oldestMoveIndex = currentPlayerMoves.shift();
            if (oldestMoveIndex !== undefined) {
                updatedSquares[oldestMoveIndex] = null;
            }
        }

        // Update state
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
            // Reconstruct moves from history up to the selected move
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

                    // Maintain max 3 moves per player
                    if (playerMoves.length > 3) {
                        playerMoves.shift();
                    }
                }
            }

            setXMoves(newXMoves);
            setOMoves(newOMoves);
        }
    };

    // Move list rendering
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
            const visibleMoves = showMoreMoves ? moves : moves.slice(-3);
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
                        currentPlayerName={isXNext ? user.firstName : umaData.name}
                        nextPlayerName={isXNext ? umaData.name : user.firstName}
                    />
                </div>

                <div className={cx('game-info')}>
                    <div>
                        {currentMove > 0 && (
                            <div style={{ display: 'flex' }}>
                                <button onClick={() => jumpTo(0)}>
                                    Go to Game Start
                                </button>
                                <button onClick={() => jumpTo(history.length - 1)}>
                                    Go to Latest Move
                                </button>
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