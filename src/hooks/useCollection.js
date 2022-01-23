import { useEffect, useState, useRef } from 'react';

// firebase
import { db } from '../firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

export const useCollection = (coll, _q) => {
    const [documents, setDocuments] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)

    const q = useRef(_q).current

    useEffect(() => {
        setIsPending(true)
        let ref = collection(db, coll)

        if (q) {
            ref = query(ref, where(...q))
        }

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            if (snapshot.empty) {
                setError('No elements to load')
                setIsPending(false)
            } else {
                let results = []

                snapshot.docs.forEach(doc => {
                    results.push({ id: doc.id, ...doc.data() })
                })

                setDocuments(results)
                setIsPending(false)
            }
        }, (err) => {
            setError(err.message)
            setIsPending(false)
        })

        return () => unsubscribe()
    }, [coll, q])

    return { documents, isPending, error }
}
