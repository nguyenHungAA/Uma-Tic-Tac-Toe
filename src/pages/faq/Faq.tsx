import { useState } from "react";
import classNames from "classnames/bind";
import { ChevronDown } from "lucide-react";
import styles from './Faq.module.scss'


function Faq() {

    const cx = classNames.bind(styles);
    const [questionInput, setQuestionInput] = useState("");


    const faqsQuestionsAnswers = [
        {
            id: 1,
            question: "What is this?",
            answer: `This is a tic-tac-toe game application you can play with your favorite Uma Musume characters.
            This is a tic-tac-toe game application you can play with your favorite Uma MusumeThis is a tic-tac-toe game application you can play with your favorite Uma MusumeThis is a tic-tac-toe game application you can play with your favorite Uma Musume
            `
        },
        {
            id: 2,
            question: "What is this?",
            answer: `This is a tic-tac-toe game application you can play with your favorite Uma Musume characters.
            This is a tic-tac-toe game application you can play with your favorite Uma MusumeThis is a tic-tac-toe game application you can play with your favorite Uma MusumeThis is a tic-tac-toe game application you can play with your favorite Uma Musume
            `
        },
        {
            id: 3,
            question: "What is this?",
            answer: `This is a tic-tac-toe game application you can play with your favorite Uma Musume characters.
            This is a tic-tac-toe game application you can play with your favorite Uma MusumeThis is a tic-tac-toe game application you can play with your favorite Uma MusumeThis is a tic-tac-toe game application you can play with your favorite Uma Musume
            `
        }
    ];

    const toggle = (id: number) => {
        const element = document.getElementById(`chevron-down-${id}`);
        const answerElement = document.getElementById(`faq-answer-${id}`);
        if (element && answerElement) {
            if (element.classList.contains(cx('show-less'))) {
                element.classList.remove(cx('show-less'));
                element.classList.add(cx('show-more'));
                answerElement.classList.add(cx('expanded'));
            } else {
                element.classList.remove(cx('show-more'));
                element.classList.add(cx('show-less'));
                answerElement.classList.remove(cx('expanded'));
            }
        }
    }

    return (
        <div className={cx('faq-page')}>
            <div className={cx('faq-header')}>
                <h1>FAQ</h1>
                <p>Got questions? We've got answers</p>
            </div>

            <div className={cx('faq-body')}>
                {faqsQuestionsAnswers.map((faqItem) => (
                    <div
                        className={cx('faq-item')}
                        key={faqItem.id}>
                        <div className={cx('faq-question')}>
                            <h2>{faqItem.question}</h2>
                            <ChevronDown
                                id={`chevron-down-${faqItem.id}`}
                                className={cx('show-less')}
                                onClick={() => toggle(faqItem.id)}
                            />
                        </div>
                        <p
                            className={cx('faq-answer')}
                            id={cx(`faq-answer-${faqItem.id}`)}
                        >
                            {faqItem.answer}
                        </p>
                    </div>
                ))}
            </div>

            <div className={cx('faq-footer')}>
                <h2>Still confused?</h2>
                <label htmlFor="question-input">Feel free to reach out to our support team for further assistance.</label>

                <textarea
                    id="question-input"
                    name="question-input"
                    cols={30}
                    rows={5}
                    placeholder="Your question goes here..."
                    value={questionInput}
                    onChange={(e) => setQuestionInput(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Faq;