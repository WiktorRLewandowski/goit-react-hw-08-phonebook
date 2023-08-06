// import { Loader } from "components/Loader"
// import { Suspense } from "react"
import { NavLink } from "react-router-dom"
import { useAuth } from "hooks"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/auth/operations"
import LogoutIcon from '@mui/icons-material/Logout';
import css from './UserMenu.module.css'


export const UserMenu = () => {
    const dispatch = useDispatch();
    const { isLogged } = useAuth()

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <>
        <nav>
            <ul className={css.list}>
                <li className={css.item}><NavLink to="/">home</NavLink></li>
                {isLogged && <li className={css.item}><NavLink to='/contacts'>contacts</NavLink></li>}
                {isLogged 
                ? (<>
                        <li className={css.item}><button className={css.button} onClick={handleLogout} type='button'><LogoutIcon/></button></li>
                    </>
                )

                : (
                    <ul className={css.list}>
                        <li className={css.item}><NavLink to="/register">register</NavLink></li>
                        <li className={css.item}><NavLink to="/login">login</NavLink></li>
                    </ul>
                )                  
                }
            </ul>  
        </nav>
        </>
    )
}