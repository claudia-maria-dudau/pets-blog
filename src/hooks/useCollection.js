import { useEffect, useState } from 'react';

// firebase
import { db } from '../firebase/config'
import { collection, onSnapshot } from 'firebase/firestore'

export const useCollection = (coll) => {
    const [documents, setDocuments] = useState(null)

    useEffect(() => {
        let ref = collection(db, coll)

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ id: doc.id, ...doc.data() })
            })
            setDocuments(results)
        })

        return () => unsubscribe()
    }, [coll])

    return { documents }
}
