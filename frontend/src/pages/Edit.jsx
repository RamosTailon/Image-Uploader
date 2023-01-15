import styles from './AddImages.module.css'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


//COMPONENTS
import ImageForm from '../components/ImageForm';

//API
import api from '../utils/api'

//HOOKS
import useFlashMessage from '../hooks/useFlashMessage'

const Edit = () => {

	const history = useNavigate();
	const [picture, setPicture] = useState({});
	const { id } = useParams();
	const { setFlashMessage } = useFlashMessage();

	useEffect(() => {

		api.get(`/image/${id}`)
			.then((response) => {
				setPicture(response.data.details)
			})
	}, [id]);

	async function updateImage(img) {
		let msgType = 'success';

		const formData = new FormData()

		await Object.keys(img).forEach((key) => {
			if (key === 'images') {
				for (let i = 0; i < img[key].length; i++) {
					formData.append('images', img[key][i])
				}
			} else {
				formData.append(key, img[key])
			}
		})

		const data = await api.patch(`/image/${picture._id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
			.then((response) => {

				return response.data
			})
			.catch((err) => {
				msgType = 'error';
				return err.response.data
			})

		setFlashMessage(data.message, msgType)

		if (msgType !== 'error') {
			history('/')
		}
	}

	return (
		<section>
			<div className={styles.container_form}>
				<h1>Editar imagem : {picture.name}</h1>
				<p className={styles.subtitle}>Depois os dados serão atualizados no sistema</p>
			</div>
			{picture.name && (
				<ImageForm handleSubmit={updateImage} btnText='Salvar' imageData={picture} />
			)}
		</section>
	)
}

export default Edit