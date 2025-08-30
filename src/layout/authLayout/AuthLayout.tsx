import { Outlet } from "react-router"
import classNames from "classnames/bind"
import style from './AuthLayout.module.scss'
function AuthLayout() {

    const cx = classNames.bind(style);

    return (
        <div className={cx('auth-layout')}>
            <Outlet />
        </div>
    )
}

export default AuthLayout