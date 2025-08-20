import { Search } from "lucide-react";
import type { Uma } from "../../types/Uma";
import { data } from "../../data/sampleUmaData";
import { useState, useMemo } from "react";
import classNames from "classnames/bind";
import styles from './UmaList.module.scss';

function UmaList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const cx = classNames.bind(styles);

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
        <div className={cx('uma-list-page')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Pick your favorite uma musume</h1>

                <div className={cx('search-section')}>
                    <div className={cx('search-container')}>
                        <input
                            type="text"
                            placeholder="Search uma musume..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={cx('search-input')}
                        />
                        <button className={cx('search-button')}>
                            <Search />
                        </button>
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
                        <div key={uma.id} className={cx('uma-card')}>
                            <div className={cx('card-image')}>
                                <img src={uma.avatar} alt={uma.name} />
                            </div>
                            <div className={cx('card-content')}>
                                <h3 className={cx('uma-name')}>{uma.name}</h3>
                                <p className={cx('uma-location')}>{uma.difficulty} • Training Center</p>
                                <button className={cx('play-button')}>
                                    Play now
                                </button>
                            </div>
                        </div>
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