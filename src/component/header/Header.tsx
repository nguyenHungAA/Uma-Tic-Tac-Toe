import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Button from '../button/Button';
import { useNavigate } from 'react-router';

function Header() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();

    return (
        <header className={cx('header')}>
            <div className={cx('header-container')}>
                <h1 className={cx('header-title')}>
                    <a href="/" className={cx('header-link')}>UmaToe</a>
                </h1>
                <nav className={cx('header-nav')}>
                    <ul className={cx('nav-list')}>
                        <li>
                            <a href="/" className={cx('nav-link')}>Uma List</a>
                        </li>
                        <li>
                            <a href="/" className={cx('nav-link')}>Chat (Comming soon)</a>
                        </li>
                        <li>
                            <a href="/" className={cx('nav-link')}>FAQ</a>
                        </li>
                        <li>
                            <a href="/" className={cx('nav-link')}>Contact</a>
                        </li>
                        <div className={cx('nav-auth')}>
                            <li>
                                <Button
                                    className={cx('nav-link-btn')}
                                    label='Log in'
                                    onClick={() => { navigate('/auth/login'); }}
                                />
                            </li>
                            <li>
                                <Button
                                    className={cx('nav-link-btn')}
                                    primary
                                    label='Sign up'
                                    onClick={() => { navigate('/auth/signup'); }}
                                />
                            </li>
                        </div>

                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;