import { useState } from "react";
import classNames from "classnames/bind";
import styles from './Faq.module.scss'

function Faq() {

    const cx = classNames.bind(styles);
    const [questionInput, setQuestionInput] = useState("");

    const faqsQuestionsAnswers = [
        {
            id: 1,
            question: "What is this?",
            answer: "This is a tic-tac-toe game application you can play with your favorite Uma Musume characters."
        },
        {
            id: 2,
            question: "What is this?",
            answer: "This is a tic-tac-toe game application you can play with your favorite Uma Musume characters."
        },
        {
            id: 3,
            question: "What is this?",
            answer: "This is a tic-tac-toe game application you can play with your favorite Uma Musume characters."
        }
    ];


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
                        <h2>{faqItem.question}</h2>
                        <p>{faqItem.answer}</p>
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