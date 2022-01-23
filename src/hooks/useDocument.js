import { useEffect, useState } from "react"

// firebase
import { db } from '../firebase/config'
import { onSnapshot, doc } from 'firebase/firestore'


export const useDocument = (coll, id) => {
    const [document, setDocument] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsPending(true)
        const docRef = doc(db, coll, id)

        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            if (snapshot.empty) {
                setError('No element to load')
                setIsPending(false)
            } else {
                setDocument({ id: snapshot.id, ...snapshot.data() })
                setIsPending(false)
            }
        }, (err) => {
            setError(err.message)
            setIsPending(false)
        })

        return () => unsubscribe()
    }, [coll, id])

    return { document, isPending, error }
}