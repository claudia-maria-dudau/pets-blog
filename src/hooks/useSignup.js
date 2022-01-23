import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "./useAuthContext"

// firebase
import { auth } from "../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const signup = async (email, password, checkPassword) => {
        setError(null)

        if (password === checkPassword) {
            const { user } = await createUserWithEmailAndPassword(auth, email, password)
                .catch((err) => { setError(err.message) })

            await updateProfile(user, {
                displayName: email.split('@')[0]
            }).catch((err) => { setError(err.message) })

            dispatch({ type: 'LOGIN', payload: user })
            navigate("/home")

        } else {
            setError("Password and Check Password don't match")
        }
    }

    return { error, signup }
}