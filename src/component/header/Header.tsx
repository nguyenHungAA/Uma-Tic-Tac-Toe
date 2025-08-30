import classNames from 'classnames/bind';
import styles from './Header.module.scss';

function Header() {
    const cx = classNames.bind(styles);

    return (
        <header className={cx('header')}>
            <div className={cx('header-container')}>
                <h1 className={cx('header-title')}>
                    <a href="/" className={cx('header-link')}>Tic Tac Toe</a>
                </h1>
                <nav className={cx('header-nav')}>
                    <ul className={cx('nav-list')}>
                        <li>
                            <a href="/" className={cx('nav-link')}>Home</a>
                        </li>
                        <li>
                            <a href="/" className={cx('nav-link')}>Home</a>
                        </li>
                        <li>
                            <a href="/" className={cx('nav-link')}>Home</a>
                        </li>
                        <li>
                            <a href="/" className={cx('nav-link')}>Home</a>
                        </li>
                        <li>
                            <a href="/" className={cx('nav-link')}>Home</a>
                        </li>

                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;