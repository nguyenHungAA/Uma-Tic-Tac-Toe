import { useNavigate } from "react-router";
import classNames from "classnames/bind";
import styles from './homePage.module.scss';

function HomePage() {
    const navigate = useNavigate();
    const cx = classNames.bind(styles);

    const generateStars = () => {
        return Array.from({ length: 50 }, (_, i) => (
            <div key={i} className={cx('star')}></div>
        ));
    }

    return (
        <div className={cx('home-container')}>
            <div className={cx('home-content')}>
                <h1 className={cx('home-title')}>Welcome to Uma Tic Tac Toe</h1>
                <p className={cx('home-paragraph')}>This is where you can play tic-tac-toe with your favorite uma musume</p>
                <button
                    onClick={() => navigate('/uma-list')}
                    className={cx('home-btn')}
                >
                    Start game now
                </button>
            </div>
            <div className={cx('stars')}>
                {generateStars()}
            </div>
        </div>
    );
}

export default HomePage;