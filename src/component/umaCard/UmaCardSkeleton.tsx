import classNames from "classnames";
import styles from './UmaCard.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function UmaCardSkeleton() {
    const cx = classNames.bind(styles);

    return (
        <div className={cx('skeleton-uma-card')}>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <div className={cx('card-image')}>
                    <Skeleton circle={true} height={100} width={100} />
                </div>
                <div className={cx('card-content')}>
                    <h3 className={cx('uma-name')}>
                        <Skeleton width="60%" />
                    </h3>
                    <p className={cx('uma-location')}>
                        <Skeleton width="40%" />
                    </p>
                    <div className={cx('button-container')}>
                        <Skeleton width="120px" height="40px" />
                        <Skeleton width="120px" height="40px" />
                    </div>
                </div>
            </SkeletonTheme>
        </div>
    );
}

export default UmaCardSkeleton;