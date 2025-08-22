import { useState, useMemo, useEffect, Suspense } from "react";
import classNames from "classnames/bind";
import { useNavigate } from "react-router";

import styles from './UmaList.module.scss';
import type { Uma } from "@/types/Uma";
import { data } from "@/data/sampleUmaData";
import UmaCard from "@/component/umaCard/UmaCard";
import SearchBar from "@/component/search/SearchBar";
import UmaListSkeleton from "./UmaListSkeleton";

function UmaList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const cx = classNames.bind(styles);

    const navigate = useNavigate();

    const getData = () => {
        fetch('/api/uma')
            .then(response => response.json())
            .then(data => {
                // Handle the fetched data
                console.log(data);
            })
            .catch(error => {
                return new Promise((resolve, reject) => {
                    reject(new Error('Failed to fetch uma data: ' + error.message));
                });
            });
    }

    useEffect(() => {
        getData();
    }, [])

    const difficulties = useMemo(() => {
        const uniqueDifficulties = [...new Set(data.map(uma => uma.difficulty))];
        return ['All', ...uniqueDifficulties];
    }, []);

    const filteredUma = useMemo(() => {
        return data.filter(uma => {
            const matchesSearch = uma.name.toLowerCase().startsWith(searchTerm.toLowerCase());
            const matchesDifficulty = selectedDifficulty === 'All' || uma.difficulty === selectedDifficulty;
            return matchesSearch && matchesDifficulty;
        });
    }, [searchTerm, selectedDifficulty]);

    return (
        <Suspense fallback={<UmaListSkeleton />}>
            <div className={cx('uma-list-page')}>
                <div className={cx('header')}>
                    <h1 className={cx('title')}>Pick your favorite uma musume</h1>
                    <div className={cx('search-section')}>
                        <div className={cx('search-container')}>
                            <SearchBar
                                type="text"
                                placeholder="Search uma musume..."
                                value={searchTerm}
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
                                    key={difficulty}
                                    value={difficulty}
                                    className={cx('difficulty-option')}
                                >
                                    {difficulty === 'All' ? 'All Difficulties' : difficulty}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={cx('uma-grid')}>
                    {filteredUma.length > 0 ? (
                        filteredUma.map((uma: Uma) => (
                            <UmaCard
                                key={uma.id}
                                id={uma.id}
                                name={uma.name}
                                avatar={uma.avatar}
                                difficulty={uma.difficulty}
                                onClick={() => navigate(`/uma/${uma.id}`)}
                            />
                        ))
                    ) : (
                        <div className={cx('no-results')}>
                            <p>No uma musume found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </Suspense>
    );
}

export default UmaList;