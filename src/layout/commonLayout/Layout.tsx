import Header from "@/component/header/Header";
import { Outlet, useLocation } from "react-router";
import classNames from "classnames/bind";
import styles from './Layout.module.scss';
import { useEffect } from "react";

function Layout() {
    const cx = classNames.bind(styles);
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

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