import classNames from "classnames/bind";
import styles from "./ErrorComponent.module.scss";
import Button from "../button/Button";
import { useNavigate } from "react-router";

interface ErrorComponentProps {
    message: string,
    type?: string,
    errorCode?: number,
}

function ErrorComponent({ message, errorCode, type }: ErrorComponentProps) {

    const cx = classNames.bind(styles);

    const navigate = useNavigate();

    switch (type) {
        case 'not found':
            return (
                <div className={cx("not-found-container")}>
                    <div className={cx("not-found-icon")}>🔍</div>
                    <h1 className={cx("not-found-title")}>404</h1>
                    <h2 className={cx("not-found-subtitle")}>No matching found</h2>
                    <p className={cx("not-found-message")}>{message}</p>
                </div>
            )
        default:
            return (
                <div className={cx("error-container")}>
                    <div className={cx('error-header')}>
                        <h1
                            className={cx('error-title')}
                        >
                            Error occurred!
                            {errorCode &&
                                <span className={cx('error-code')}>
                                    Error Code: {errorCode}
                                </span>}
                        </h1>
                        <p className={cx('error-message')}>
                            {message}
                        </p>
                    </div>
                    <div className={cx('error-body')}>
                        <p>Please try again later or contact support if the issue persists.</p>
                    </div>
                    <div className={cx('error-cta')}>
                        <Button
                            label='Go Back'
                            onClick={() => navigate(-1)}
                            primary
                        />
                        <Button
                            label='To support page'
                            onClick={() => navigate('/support')}
                        />
                    </div>
                </div>
            )
    }
}

export default ErrorComponent;