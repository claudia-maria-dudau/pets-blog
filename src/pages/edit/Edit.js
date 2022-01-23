import { useParams, useNavigate } from "react-router-dom"
import { useDocument } from "../../hooks/useDocument"
import { useState, useEffect } from "react"

// components
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AlertError from '../../components/AlertError'
import AlertIsPending from "../../components/AlertIsPending"

// firebase
import { db, storage } from '../../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

// styles
import "./Edit.css"

export default function Edit() {
  const { id } = useParams()
  const { document: article, isPending, error } = useDocument('articles', id)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [imageError, setImageError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const navigate = useNavigate()

  // loading article data into the edit form
  useEffect(() => {
    if (article) {
      setTitle(article.title)
      setContent(article.content)
    }
  }, [article])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (!imageError) {
      const docRef = doc(db, 'articles', article.id)

      if (image) {
        // deleting previous image
        const prevImgRef = ref(storage, article.imageURL)
        deleteObject(prevImgRef)
          .catch((err) => setSubmitError(err.message))

        // upload new article image
        const uploadPath = `articles/${docRef.id}/${image.name}`
        const storageRef = ref(storage, uploadPath)
        const uploadTask = uploadBytesResumable(storageRef, image, 'data_url')

        uploadTask.on("state-changed", null,
          (err) => setSubmitError(err.message),
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => {
                updateDoc(docRef, {
                  imageURL: url
                }).catch((err) => setSubmitError(err.message))
              })
              .catch((err) => setSubmitError(err.message))
          }
        )
      }

      updateDoc(docRef, {
        title: title,
        content: content,
      }).catch((err) => setSubmitError(err))

      navigate(`/articles/${article.id}`)
    } else {
      setSubmitError("Could not upload image")
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
      {isPending && <AlertIsPending />}

      {article && (
        <Form className="edit-article-form" onSubmit={handleSubmit}>
          <h3>Edit article</h3>
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
            <Form.Label>Change Picture</Form.Label>
            <Form.Control type="file"
              onChange={handleFileChange}
            />
          </Form.Group>

          {imageError && <AlertError message={imageError} />}

          <Button type="submit">Save Changes</Button>
        </Form>
      )}

      {error && <AlertError message={error} />}
      {submitError && <AlertError message={submitError} />}
    </>
  );
}
