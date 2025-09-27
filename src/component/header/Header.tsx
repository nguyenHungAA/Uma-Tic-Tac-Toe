import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Button from '../button/Button';
import { useNavigate } from 'react-router';
import useScrollDirection from '@/hooks/useScrollDirection';
import { useEffect } from 'react';


function Header() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    const scrollDirection = useScrollDirection();

    useEffect(() => {
        const header = document.getElementById('header');
        if (header) {
            if (scrollDirection === 'down') {
                header.style.top = '-150px';
            } else {
                header.style.top = '0';
            }
        }
    }, [cx, scrollDirection]);

    return (
        <header
            id='header'
            className={cx('header')}>
            <div className={cx('header-container')}>
                <h1 className={cx('header-title')}>
                    <a href="/" className={cx('header-link')}>UmaToe</a>
                </h1>
                <nav className={cx('header-nav')}>
                    <ul className={cx('nav-list')}>
                        <li>
                            <a href="/uma-list" className={cx('nav-link')}>Uma List</a>
                        </li>
                        <li>
                            <a href="/" className={cx('nav-link')}>Chat (Coming soon)</a>
                        </li>
                        <li>
                            <a href="/faq" className={cx('nav-link')}>FAQ</a>
                        </li>
                        <li>
                            <a href="/" className={cx('nav-link')}>Contact</a>
                        </li>
                        <div className={cx('nav-auth')}>
                            {
                                token ? <>
                                    <li>
                                        <Button
                                            className={cx('nav-link-btn')}
                                            label='Log out'
                                            onClick={() => { navigate('/auth/logout'); }}
                                        />
                                    </li>
                                </> : <>
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
                                </>
                            }
                        </div>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;