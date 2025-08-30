import classNames from "classnames/bind";
import style from './Square.module.scss'

function Square({ id, value, onSquareClick }: { id: number, value: string | null, onSquareClick: () => void }) {
    const cx = classNames.bind(style);
    return (
        <>
            <button
                id={`square-${id}`}
                onClick={onSquareClick}
                className={cx('square')}
            >
                {value}
            </button>
        </>
    )
}

export default Square;
