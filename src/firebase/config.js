import { initializeApp } from 'firebase/app'
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC6t_XEyMGeiaj3InvQKx9-mT2S4mO9RQc",
    authDomain: "pets-blog.firebaseapp.com",
    projectId: "pets-blog",
    storageBucket: "pets-blog.appspot.com",
    messagingSenderId: "680507874953",
    appId: "1:680507874953:web:f349a7b8eac95f2367f058"
}

// init firebase
initializeApp(firebaseConfig)

// init firestore
const db = getFirestore()

export { db }