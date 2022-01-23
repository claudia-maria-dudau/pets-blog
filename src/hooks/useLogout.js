import { useAuthContext } from "./useAuthContext"

// firebase
import { auth } from "../firebase/config"
import { signOut } from "firebase/auth"

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        signOut(auth)
            .then(() => {
                console.log('user logged out')
                dispatch({ type: 'LOGOUT' })
            })
            .catch((err) => {
                console.log(err.messaje)
            })
    }

    return { logout }
}