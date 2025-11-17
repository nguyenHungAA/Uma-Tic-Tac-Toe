import { useNavigate } from "react-router";
import classNames from "classnames/bind";
import styles from './homePage.module.scss';
import Button from "@/component/button/Button";
import { useEffect, useState } from "react";

function HomePage() {
    const navigate = useNavigate();
    const cx = classNames.bind(styles);
    const [imageIndex, setImageIndex] = useState(0);
    const [manualSlide, setManualSlide] = useState(false);

    useEffect(() => {
        if (manualSlide) return;
        const interval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 3000);

        return () => clearInterval(interval);

    }, [manualSlide]);

    const imageUrls = [
        "https://pub-362e04190c3d4dd2b44146c65e89f2a1.r2.dev/manhattanCafe.jpg",
        "https://pub-362e04190c3d4dd2b44146c65e89f2a1.r2.dev/agnesDigital.jpg",
        "https://pub-362e04190c3d4dd2b44146c65e89f2a1.r2.dev/agnesTachyon.jpg"
    ];

    const generateStars = () => {
        return Array.from({ length: 50 }, (_, i) => (
            <div key={i} className={cx('star')}></div>
        ));
    };
    const scrollToInstruction = () => {
        const instructionSection = document.getElementById('instruction-section');
        if (instructionSection) {
            instructionSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const handleSlideClick = (index: number) => {
        setManualSlide(true);
        setImageIndex(index);
    }

    return (
        <div className={cx('home-container')}>
            <section className={cx('home-content')}>
                <h1 className={cx('home-title')}>Welcome to Uma Tic Tac Toe</h1>
                <p className={cx('home-paragraph')}>This is where you can play tic-tac-toe with your favorite uma musume</p>
                <div className={cx('home-buttons')}>
                    <Button
                        label="Start game now"
                        onClick={() => navigate('/uma-list')}
                        className={cx('home-btn')}
                        primary
                    />
                    <a
                        onClick={scrollToInstruction}
                        className={cx('instruction-btn')}
                    >
                        View instructions
                    </a>
                </div>
            </section>

            <section
                id="instruction-section"
                className={cx('instruction-section')}
            >
                <div className={cx('instruction-header')}>
                    <h1>Tic Tac Toe Instructions</h1>
                    <p>If you thought this is the usual tic tac toe, you are mistaken!</p>
                </div>

                <div className={cx('instruction-content')}>
                    <div className={cx('instruction-text')}>
                        <h2>How to Play</h2>
                        <ol className={cx('instruction-list')}>
                            <li>1) Select your favorite Uma Musume from the Uma List.</li>
                            <li>2) You will be playing the usual tic tac toe game with her in a 3x3 grid</li>
                            <li>3) Here's the twist, you can only place 3 marks on the grid at a time. The fourth mark will delete the first one</li>
                            <li>4) Keep playing until you win the game (or not)</li>
                            <li>5) Have fun!</li>
                        </ol>
                    </div>
                    <div className={cx('instruction-image')}>
                        <img
                            className={cx('slideshow-image')}
                            src={imageUrls[imageIndex]} alt="sample-img" />
                        <div className={cx('image-slideshow')}>
                            {imageUrls.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSlideClick(index)}
                                    className={cx({ active: imageIndex === index })}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <div className={cx('stars')}>
                {generateStars()}
            </div>


        </div>
    );
}

export default HomePage;