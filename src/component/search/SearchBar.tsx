
import React from 'react';
import { Search } from 'lucide-react';
import classNames from "classnames/bind";

import styles from './SearchBar.module.scss';

interface SearchBarProps {
    type?: string;
    placeholder: string;
    value: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

function SearchBar({ type = "text", placeholder, value, onChange, onKeyDown, className }: SearchBarProps) {

    const cx = classNames.bind(styles);

    return (
        <div className={`${cx('input-container')} ${className || ''}`}>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onKeyDown={onKeyDown}
                onChange={onChange}
                className={`${cx('search-input')} ${className || ''}`}
            />
            <button className={cx('search-button')}>
                <Search />
            </button>
        </div>
    )
}

export default SearchBar;