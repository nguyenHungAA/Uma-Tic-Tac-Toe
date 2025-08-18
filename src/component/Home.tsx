import { useNavigate } from "react-router";
import classNames from "classnames/bind";
import styles from './homePage.module.scss';
function HomePage() {
    const navigate = useNavigate();
    const cx = classNames.bind(styles);

    return (
        <div>
            <h1>Welcome to Uma-tic Uma-tac not Uma-toe</h1>
            <p>This is where you can play tic-tac-toe with your favorite uma musume, even random with one </p>
            <button
                onClick={() => navigate('/game')}
                className={cx('home-btn')}
            >
                Start game now
            </button>
        </div>
    );
}

export default HomePage;