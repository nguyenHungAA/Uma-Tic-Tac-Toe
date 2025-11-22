import { useNavigate } from 'react-router';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import Button from '../button/Button';

interface ModalProps {
    message: string;
    isOpen: boolean;
    onClose: () => void;
    navigatePath?: string;
    navigateLabel?: string;
    showCancel?: boolean;
}

function Modal({
    message,
    isOpen,
    onClose,
    navigatePath,
    navigateLabel = 'Go',
    showCancel = true
}: ModalProps) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleNavigate = () => {
        if (navigatePath) {
            navigate(navigatePath);
            onClose();
        }
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={cx('modal-overlay')} onClick={handleOverlayClick}>
            <div className={cx('modal-content')}>
                <div className={cx('modal-body')}>
                    <p className={cx('modal-message')}>{message}</p>
                </div>

                <div className={cx('modal-footer')}>
                    {navigatePath && (
                        <Button
                            className={cx('modal-navigate')}
                            label={navigateLabel}
                            onClick={handleNavigate}
                            primary
                        />
                    )}
                    {showCancel && (
                        <Button
                            className={cx('modal-cancel')}
                            label="Cancel"
                            onClick={onClose}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Modal;
