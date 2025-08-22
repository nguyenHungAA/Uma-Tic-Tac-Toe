import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import classNames from "classnames/bind";
import styles from './UmaList.module.scss';

import UmaCardSkeleton from "@/component/umaCard/UmaCardSkeleton";

function UmaListSkeleton() {
    const cx = classNames.bind(styles);

    return (
        <div className={cx('uma-list-page')}>
            <div className={cx('header')}>
                <SkeletonTheme baseColor="#2a2a2a" highlightColor="#3a3a3a">
                    <h1 className={cx('title')}>
                        <Skeleton height={44} width={400} />
                    </h1>
                </SkeletonTheme>

                <div className={cx('search-section')}>
                    <div className={cx('search-container')}>
                        <SkeletonTheme baseColor="#2a2a2a" highlightColor="#3a3a3a">
                            <Skeleton height={42} width={500} className={cx('search-input')} />
                        </SkeletonTheme>
                    </div>

                    <SkeletonTheme baseColor="#2a2a2a" highlightColor="#3a3a3a">
                        <Skeleton height={42} width={135} className={cx('difficulty-filter')} />
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