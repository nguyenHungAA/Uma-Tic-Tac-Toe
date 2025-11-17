import styles from './Footer.module.scss';
import classNames from 'classnames/bind';

export default function Footer() {
    const cx = classNames.bind(styles);

    return (
        <footer className={cx('footer')}>
            <div className={cx('footer-content')}>
                <div className={cx('footer-section')}>
                    <h3>Uma Tic Tac Toe</h3>
                    <p>Play tic-tac-toe with your favorite Uma Musume characters!</p>
                </div>

                <div className={cx('footer-section')}>
                    <h4>Quick Links</h4>
                    <ul className={cx('footer-links')}>
                        <li><a href="/">Home</a></li>
                        <li><a href="/uma-list">Uma List</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                <div className={cx('footer-section')}>
                    <h4>Contact Us</h4>
                    <ul className={cx('footer-contact')}>
                        <li>
                            <span>📧</span>
                            <a href="mailto:contact@umatictactoe.com">contact@umatictactoe.com</a>
                        </li>
                        <li>
                            <span>📞</span>
                            <a href="tel:+1234567890">+1 (234) 567-890</a>
                        </li>
                        <li>
                            <span>🌐</span>
                            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={cx('footer-bottom')}>
                <p>© 2024 Uma Tic Tac Toe. All rights reserved.</p>
            </div>
        </footer>
    );
}