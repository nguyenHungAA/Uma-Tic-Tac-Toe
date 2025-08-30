import Header from "@/component/header/Header";
import { Outlet } from "react-router";
import classNames from "classnames/bind";
import styles from './Layout.module.scss';

function Layout() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('layout')}>
            <Header />
            <main className={cx('main')}>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;