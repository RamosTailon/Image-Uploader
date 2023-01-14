import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

//API
import api from '../utils/api'

// HOOKS
import useFlashMessage from '../hooks/useFlashMessage'

const Home = () => {

    const [images, setImages] = useState([]);
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get('/image/all')
            .then((response) => {
                setImages(response.data.view)
            })
    }, [])



    return (
        <section className={styles.homes}>
            {images.length > 0 &&
                images.map((image) => (
                    <div key={image._id}>
                        <img
                            src={`${import.meta.env.VITE_REACT_APP_API}/img/${image.images[0]}`}
                            alt={images.name}
                        />
                        <span>{image.name}</span>
                        <span>{image.rating}</span>
                    </div>
                ))
            }
            {images.length === 0 && <p>Não há imagens cadastradas</p>}
        </section>
    )
}

export default Home