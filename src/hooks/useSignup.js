import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

// firebase
import { auth } from "../firebase/config"
import { createUserWithEmailAndPassword } from "firebase/auth"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = (email, password, checkPassword) => {
        setError(null)

        if (password === checkPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((response) => {
                    console.log('user signed up')
                    dispatch({ type: 'LOGIN' , payload: response.user })
                })
                .catch((err) => {
                    setError(err.message)
                })
        } else {
            setError("Password and Check Password don't match")
        }
    }

    return { error, signup }
}