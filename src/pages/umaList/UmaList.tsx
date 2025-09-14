import { useState, useMemo, useEffect } from "react";
import classNames from "classnames/bind";
import { useNavigate } from "react-router";

import styles from './UmaList.module.scss';
import UmaCard from "@/component/umaCard/UmaCard";
import SearchBar from "@/component/search/SearchBar";
import { useUma } from "@/hooks/useUma";
import UmaListSkeleton from "./UmaListSkeleton";
import Pagination from "@/component/pagination/Pagination";
import type { Uma } from "@/types/Uma";

const pageSize = 9;
const fetchSize = 27;
function UmaList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [responseUmaNumber, setResponseUmaNumber] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [allUmas, setAllUmas] = useState<Uma[]>([]);

    const cx = classNames.bind(styles);
    const navigate = useNavigate();

    const currentBatch = Math.floor((currentPage - 1) / 3);
    const offset = currentBatch * fetchSize;


    const { data, error, isLoading } = useUma(offset, fetchSize);

    useEffect(() => {
        if (data && data.data) {
            setAllUmas(prev => {
                const newUmas = [...prev];
                const startIndex = offset;

                data.data.forEach((uma, index) => {
                    newUmas[startIndex + index] = uma;
                });
                return newUmas;
            })
        }
    }, [data, offset]);



    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    useEffect(() => {
        const umaGrid = document.getElementById('uma-grid');
        if (!umaGrid) return;

        umaGrid.classList.remove(cx('one-uma'));
        umaGrid.classList.remove(cx('two-uma'));

        switch (responseUmaNumber) {
            case 1:
                umaGrid?.classList.add(cx('one-uma'));
                break;
            case 2:
                umaGrid?.classList.add(cx('two-uma'));
                break;
            default:
                break;
        }
    }, [cx, responseUmaNumber]);

    const difficulties = useMemo(() => {
        const uniqueDifficulties = [...new Set(data?.data.map(uma => uma.attributes.difficulty))];
        return ['All', ...uniqueDifficulties];
    }, [data]);



    const filteredUma = useMemo(() => {
        return allUmas.filter(uma => {
            const matchesSearch = uma.attributes.name.toLowerCase().includes(activeSearchTerm.toLowerCase());
            const matchesDifficulty = uma.attributes.difficulty === selectedDifficulty;
            if (selectedDifficulty === 'All') {
                return matchesSearch;
            }
            return matchesSearch && matchesDifficulty;
        });
    }, [activeSearchTerm, allUmas, selectedDifficulty]);
    console.log(filteredUma);

    const currentPageUmas = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return filteredUma?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredUma]);

    useEffect(() => {
        setResponseUmaNumber(currentPageUmas?.length || 0);
    }, [currentPageUmas]);

    const handleSearch = () => {
        setActiveSearchTerm(searchTerm);
        setCurrentPage(1);
    }


    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    if (isLoading) {
        return <UmaListSkeleton />;
    }

    if (error) {
        return <div className={cx('error')}>Error loading uma musume data.</div>;
    }

    return (
        <div className={cx('uma-list-page')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Pick your favorite uma musume</h1>
                <div className={cx('search-section')}>
                    <div className={cx('search-container')}>
                        <SearchBar
                            type="text"
                            placeholder="Search uma musume..."
                            value={searchTerm}
                            onKeyDown={handleSearchKeyDown}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={cx('search-input')}
                        />
                    </div>

                    <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className={cx('difficulty-filter')}
                    >
                        {difficulties.map(difficulty => (
                            <option
                                key={difficulty || undefined}
                                value={difficulty}
                                className={cx('difficulty-option')}
                            >
                                {difficulty === 'All' ? 'All Difficulties' : difficulty}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div
                id="uma-grid"
                className={cx('uma-grid')}>
                {currentPageUmas && currentPageUmas?.length > 0 ? (
                    currentPageUmas?.map((uma) => (
                        <UmaCard
                            key={uma.attributes.id}
                            id={uma.attributes._id}
                            name={uma.attributes.name}
                            avatar={uma.attributes.avatar}
                            difficulty={uma.attributes.difficulty}
                            onClick={() => navigate(`/${uma.attributes._id}/game`)}
                        />
                    ))
                ) : (
                    <div className={cx('no-results')}>
                        <p>No uma musume found matching your criteria.</p>
                    </div>
                )}
            </div>
            <Pagination
                className={cx('pagination-bar')}
                currentPage={currentPage}
                totalCount={data?.meta.totalItems || 0}
                pageSize={pageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    );
}


export default UmaList;