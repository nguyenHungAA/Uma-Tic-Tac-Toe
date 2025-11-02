import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Button from '../button/Button';
import { useNavigate } from 'react-router';
import useScrollDirection from '@/hooks/useScrollDirection';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


function Header() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const scrollDirection = useScrollDirection();

    const [isLoading, setIsLoading] = useState(false);

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


    const profileMenuContent = (
        <div className={cx('profile-menu')}>
            <div className={cx('profile-info')}>
                <p className={cx('profile-name')}>{user?.firstName} {user?.lastName}</p>
                <p className={cx('profile-email')}>{user?.email}</p>
            </div>
            <div className={cx('profile-actions')}>
                <Button
                    className={cx('profile-btn')}
                    label="Profile"
                    onClick={() => navigate('user/profile/' + user._id)}
                />
                <Button
                    className={cx('profile-btn')}
                    label="Settings"
                    onClick={() => navigate('user/settings')}
                />
                <Button
                    className={cx('profile-btn', 'logout-btn')}
                    label={isLoading ? 'Logging out...' : 'Log out'}
                    onClick={handleLogout}
                    disabled={isLoading}
                />
            </div>
        </div>
    );

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
                        <ul className={cx('nav-auth')}>
                            {
                                token ? <>
                                    <li className={cx('nav-user-info')}>
                                        <Tippy
                                            content={profileMenuContent}
                                            interactive={true}
                                            placement='bottom'
                                            theme="light"
                                            animation="fade"
                                            duration={100}
                                            hideOnClick={true}
                                            allowHTML={true}
                                        >
                                            <div className={cx('nav-avatar-container')}>
                                                <img
                                                    src={user?.avatar || '/default-avatar.png'}
                                                    alt="User Avatar"
                                                    className={cx('nav-avatar')}
                                                />

                                            </div>
                                        </Tippy>
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
                        </ul>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;