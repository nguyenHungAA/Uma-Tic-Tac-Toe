import { useState, useMemo, useEffect } from "react";
import classNames from "classnames/bind";
import { useNavigate } from "react-router";

import styles from './UmaList.module.scss';
import UmaCard from "@/component/umaCard/UmaCard";
import SearchBar from "@/component/search/SearchBar";
import { useUma } from "@/hooks/useUma";
import UmaListSkeleton from "./UmaListSkeleton";

function UmaList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [responseUmaNumber, setResponseUmaNumber] = useState(0);
    const cx = classNames.bind(styles);

    const navigate = useNavigate();
    const { data, error, isLoading } = useUma();

    useEffect(() => {
        const umaGrid = document.getElementById('uma-grid');
        switch (responseUmaNumber) {
            case 1:
                umaGrid?.classList.add(cx('one-uma'));
                break;
            case 2:
                umaGrid?.classList.add(cx('two-uma'));
                break;
            default:
                umaGrid?.classList.remove(cx('one-uma'));
                umaGrid?.classList.remove(cx('two-uma'));
                break;
        }
    }, [cx, responseUmaNumber]);



    const difficulties = useMemo(() => {
        const uniqueDifficulties = [...new Set(data?.data.map(uma => uma.attributes.difficulty))];
        return ['All', ...uniqueDifficulties];
    }, [data]);

    const filteredUma = useMemo(() => {
        return data?.data.filter(uma => {
            const matchesSearch = uma.attributes.name.toLowerCase().startsWith(activeSearchTerm.toLowerCase());
            const matchesDifficulty = selectedDifficulty === 'All' || uma.attributes.difficulty === selectedDifficulty;
            return matchesSearch && matchesDifficulty;
        });
    }, [activeSearchTerm, data, selectedDifficulty]);

    useEffect(() => {
        setResponseUmaNumber(filteredUma?.length || 0);
    }, [filteredUma]);

    const handleSearch = () => {
        setActiveSearchTerm(searchTerm);
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
                {filteredUma && filteredUma?.length > 0 ? (
                    filteredUma?.map((uma) => (
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
        </div>
    );
}


export default UmaList;