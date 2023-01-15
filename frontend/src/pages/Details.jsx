import styles from './Details.module.css'
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate} from 'react-router-dom'


//API
import api from '../utils/api'

import useFlashMessage from '../hooks/useFlashMessage'

const Details = () => {

	const [picture, setPicture] = useState({});
	const { id } = useParams()
	const { setFlashMessage } = useFlashMessage()
	const history = useNavigate()

	//pegar todas imagens
	useEffect(() => {
		api.get(`/image/${id}`)
			.then((response) => {
				setPicture(response.data.details)
			})
			.catch()
	}, [id]);

	async function removeImage(id) {
		let msgType = 'success'

		const data = await api.delete(`/image/${id}`)
			.then((response) => {
				return response.data
			})
			.catch((err) => {
				msgType = 'error';
				return err.response.data
			})
		setFlashMessage(data.message, msgType)
		console.log(data.message)
		history('/')
	}


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
						<button
							className={styles.btn}
							id={styles.editBtn}><Link to={`/edit/${picture._id}`}>Editar</Link></button>
						<button
							className={styles.btn}
							id={styles.deleteBtn}
							onClick={() => { removeImage(picture._id) }}>Excluir</button>
					</div>
				</section>
			)}
		</>
	)
}

export default Details