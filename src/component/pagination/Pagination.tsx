import classNames from "classnames/bind";
import styles from "./Pagination.module.scss";
import { usePagination } from "@/hooks/usePagination";

interface PaginationProps {
    onPageChange: (page: number) => void;
    totalCount: number;
    siblingCount?: number;
    currentPage: number;
    pageSize: number;
    className?: string;
}

function Pagination({
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
}: PaginationProps) {
    const cx = classNames.bind(styles);

    const paginationRange = usePagination({
        totalCount,
        pageSize,
        siblingCount,
        currentPage
    });

    if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };
    const onPrevious = () => {
        onPageChange(currentPage - 1);
    }
    const lastPage = paginationRange ? paginationRange[paginationRange.length - 1] : 0;

    return (
        <ul className={cx('pagination-container', { [className || '']: !!className })}>
            <li
                className={cx('pagination-item', { disabled: currentPage === 1 })}
                onClick={onPrevious}
            >
                <div className={cx('arrow', 'left')} />
            </li>
            {paginationRange && paginationRange.map((pageNumber, index) => {
                if (pageNumber === '...') {
                    return <li key={index} className={cx('pagination-item', 'dots')}>&#8230;</li>;
                }
                return (
                    <li
                        key={index}
                        className={cx('pagination-item', { active: pageNumber === currentPage })}
                        onClick={() => onPageChange(Number(pageNumber))}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={cx('pagination-item', { disabled: currentPage === lastPage })}
                onClick={onNext}
            >
                <div className={cx('arrow', 'right')} />
            </li>
        </ul>
    );
}

export default Pagination;