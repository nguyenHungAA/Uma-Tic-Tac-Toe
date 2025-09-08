import classNames from "classnames/bind";
import styles from './Button.module.scss';
import type { JSX } from "react/jsx-dev-runtime";

interface ButtonProps {
    label: string | JSX.Element;
    onClick: () => void;
    primary?: boolean;
    className?: string;
    disabled?: boolean;
    children?: React.ReactNode;
}

function Button({ label, onClick, primary, className, disabled, children }: ButtonProps) {

    const cx = classNames.bind(styles);
    const buttonType = primary ? 'btn-primary' : 'btn-secondary';

    return (
        <button
            onClick={onClick}
            className={`${cx(buttonType)} ${className || ''}`}
            disabled={disabled}
        >
            {children || label}
        </button>
    );

}

export default Button;