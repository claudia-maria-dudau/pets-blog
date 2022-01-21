import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

// firebase
import { auth } from "../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const login = (email, password) => {
        setError(null)

        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                console.log('user logged in')
                dispatch({ type: 'LOGIN' , payload: response.user })
            })
            .catch((err) => {
                setError(err.message)
            })
    }

    return { error, login }
}