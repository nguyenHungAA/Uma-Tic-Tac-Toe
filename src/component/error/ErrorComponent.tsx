import classNames from "classnames/bind";
import styles from "./ErrorComponent.module.scss";
import Button from "../button/Button";
import { useNavigate } from "react-router";

interface ErrorComponentProps {
    message: string,
    errorCode?: number,
}

function ErrorComponent({ message, errorCode }: ErrorComponentProps) {

    const cx = classNames.bind(styles);

    const navigate = useNavigate();

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

export default ErrorComponent;