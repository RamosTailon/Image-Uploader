import styles from './Details.module.css'
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'

//API
import api from '../utils/api'

import useFlashMessage from '../hooks/useFlashMessage'

const Details = () => {

	const [picture, setPicture] = useState({});
	const { id } = useParams()
	const { setFlashMessage } = useFlashMessage()

	//pegar todas imagens
	useEffect(() => {
		api.get(`/image/${id}`)
			.then((response) => {
				setPicture(response.data.details)
			})
			.catch()
	}, [id]);




	return (
		<>
			{picture.name && (
				<section>
					<div className={styles.image_group}>
						{
							picture.images.map((image, index) => (
								<img
									key={index}
									src={`${import.meta.env.VITE_REACT_APP_API}/img/${image}`}
									alt={picture.name}
								/>
							))
						}
					</div>

					< div className={styles.info}>
						<p>Nome: {picture.name}</p>
						<p>Classificação: {picture.rating} de 5</p>
					</div>
				</section>
			)}
		</>
	)
}

export default Details