import classNames from "classnames/bind";
import style from './Square.module.scss'

function Square({ id, value, onSquareClick, disabled }:
    { id: number, value: string | null, onSquareClick: () => void, disabled?: boolean }) {
    const cx = classNames.bind(style);
    return (
        <>
            <button
                id={`square-${id}`}
                onClick={onSquareClick}
                className={cx('square')}
                disabled={disabled}
            >
                {value}
            </button>
        </>
    )
}

export default Square;
