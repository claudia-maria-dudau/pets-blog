import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AlertError from '../../components/AlertError'

// firebase
import { db, storage } from '../../firebase/config'
import { collection, addDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

// styles
import './Create.css'

export default function Create() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)
    const [imageError, setImageError] = useState('')
    const [error, setError] = useState('')
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!imageError) {
            const colRef = collection(db, 'articles')

            const docRef = await addDoc(colRef, {
                title: title,
                content: content,
                date: new Date().toLocaleString(),
                imgURL: "",
                user: user.email,
                uid: user.uid,
            }).catch((err) => setError(err.message))

            if (image) {
                // upload article image
                const uploadPath = `articles/${docRef.id}/${image.name}`
                const storageRef = ref(storage, uploadPath)
                const uploadTask = uploadBytesResumable(storageRef, image, 'data_url')
                
                uploadTask.on("state-changed", null,
                    (err) => setError(err.message),
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((url) => {
                                updateDoc(docRef, {
                                    imageURL: url
                                }).catch((err) => setError(err.message))
                            })
                            .catch((err) => setError(err.message))
                    }
                )
            }

            setTitle('')
            setContent('')
            setImage(null)

            navigate("/articles")
        } else {
            setError("Could not upload image")
        }
    }

    const handleFileChange = (e) => {
        setImage(null)
        setImageError('')

        let selectedImg = e.target.files[0]

        if (selectedImg) {
            if (!selectedImg.type.includes('image')) {
                setImageError("Selected file must be an image")
                return
            }

            setImageError('')
            setImage(selectedImg)
        }
    }

    return (
        <>
            <Form className="create-form" onSubmit={handleSubmit}>
                <h3>Create article</h3>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control required type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control required as="textarea" rows={5}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="file"
                        onChange={handleFileChange}
                    />
                </Form.Group>

                {imageError && <AlertError message={imageError} />}

                <Button variant="outline-light" type="submit">
                    Create
                </Button>
            </Form>

            {error && <AlertError message={error} />}
        </>
    )
}
