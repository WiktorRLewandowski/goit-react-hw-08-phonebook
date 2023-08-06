import { useSelector } from "react-redux"
import {
    selectUser,
    selectIsLogged,
    selectIsRefreshing,
} from '../redux/auth/selectors'

export const useAuth = () => {
    const isLogged = useSelector(selectIsLogged)
    const isRefreshing = useSelector(selectIsRefreshing)
    const user = useSelector(selectUser)

    return {
        isLogged,
        isRefreshing,
        user
    }
}