import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Button from '../button/Button';
import { useNavigate } from 'react-router';
import useScrollDirection from '@/hooks/useScrollDirection';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';


function Header() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const scrollDirection = useScrollDirection();

    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);
        setTimeout(async () => {
            try {
                await signOut(auth);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/auth/login');
            } catch (error) {
                console.error('Error signing out from Firebase:', error);
                alert('Failed to log out. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }, 1000);
    }

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
                                            label={isLoading ? 'Loading...' : 'Log out'}
                                            onClick={handleLogout}
                                        />
                                    </li>
                                    <li>
                                        <span
                                            className={cx('nav-username')}
                                        >
                                            {user?.Username}
                                        </span>
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