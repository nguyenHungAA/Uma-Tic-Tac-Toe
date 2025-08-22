import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import classNames from "classnames";
import styles from './UmaList.module.scss';

import UmaCardSkeleton from "@/component/umaCard/UmaCardSkeleton";

function UmaListSkeleton() {

    const cx = classNames.bind(styles);

    return (
        <div className={cx('uma-list-page')}>
            <div className={cx('header')}>
                <SkeletonTheme baseColor="#2a2a2a" highlightColor="#3a3a3a">
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <Skeleton height={48} width={400} />
                    </div>
                </SkeletonTheme>

                <div className={cx('search-section')}>
                    <div className={cx('search-container')}>
                        <SkeletonTheme baseColor="#2a2a2a" highlightColor="#3a3a3a">
                            <Skeleton height={48} style={{ borderRadius: '8px' }} />
                        </SkeletonTheme>
                    </div>

                    <SkeletonTheme baseColor="#2a2a2a" highlightColor="#3a3a3a">
                        <Skeleton height={48} width={200} style={{ borderRadius: '8px' }} />
                    </SkeletonTheme>
                </div>
            </div>

            <div className={cx('uma-grid')}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <UmaCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}

export default UmaListSkeleton;