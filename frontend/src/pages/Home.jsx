import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

//API
import api from '../utils/api'

// HOOKS
import useFlashMessage from '../hooks/useFlashMessage'

const Home = () => {

	const [images, setImages] = useState([]);
	const [stars, setStars] = useState();
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
					<div key={image._id} className={styles.single}>
						<img
							src={`${import.meta.env.VITE_REACT_APP_API}/img/${image.images[0]}`}
							alt={images.name}
						/>
						<div className={styles.info}>
							<Link to={`/details/${image._id}`}>{image.name}</Link>
							<ul className={styles.rating}>
								<li className={`${styles.star_icon} ${image.rating == 1 ? styles.active : ''}`}></li>
								<li className={`${styles.star_icon} ${image.rating == 2 ? styles.active : ''}`}></li>
								<li className={`${styles.star_icon} ${image.rating == 3 ? styles.active : ''}`}></li>
								<li className={`${styles.star_icon} ${image.rating == 4 ? styles.active : ''}`}></li>
								<li className={`${styles.star_icon} ${image.rating == 5 ? styles.active : ''}`}></li>
							</ul>

						</div>
					</div>
				))
			}
			{images.length === 0 && <p>Não há imagens cadastradas</p>}
		</section>
	)
}

export default Home