import classNames from "classnames/bind";
import styles from './UmaCard.module.scss';
import Button from "@/component/button/Button";
import { useNavigate } from "react-router";

interface UmaCardProps {
    id: string;
    name: string;
    avatar: string;
    onClick: () => void;
    difficulty: string;
    className?: string;
    disabled?: boolean;
    children?: React.ReactNode;
}

function UmaCard({ id, name, avatar, difficulty, onClick, disabled }: UmaCardProps) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    return (
        <div key={id} className={cx('uma-card')}>
            <div className={cx('card-image')}>
                <img src={avatar} alt={name} />
            </div>
            <div className={cx('card-content')}>
                <h3 className={cx('uma-name')}>{name}</h3>
                <p className={cx('uma-location')}>{difficulty}</p>
                <div className={cx('button-container')}>
                    <Button
                        className={cx('cta-button')}
                        onClick={() => navigate(`/profile/${id}`)}
                        disabled={disabled}
                        label="View profile"
                    >
                    </Button>
                    <Button
                        className={cx('cta-button')}
                        onClick={onClick}
                        disabled={disabled}
                        primary
                        label="Play Now"
                    >
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UmaCard;