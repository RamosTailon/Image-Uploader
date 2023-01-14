import styles from './AddImages.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

//COMPONENTS
import ImageForm from '../components/ImageForm';

//API
import api from '../utils/api'

//HOOKS
import useFlashMessage from '../hooks/useFlashMessage'

const AddImages = () => {

    const { setFlashMessage } = useFlashMessage()
    const history = useNavigate()

    async function imagesUp(image) {
        let msgType = 'success'

        const formData = new FormData()

        const imageFormData = await Object.keys(image).forEach((key) => {
            if (key === 'images') {
                for (let i = 0; i < image[key].length; i++) {
                    formData.append(`images`, image[key][i])
                }
            } else {
                formData.append(key, image[key])
            }
        })

        //---------------------------------
        const data = await api
            .post(`/image/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log(response.data)
                return response.data
            })
            .catch((err) => {
                //console.log(err)
                msgType = 'error'
                return err.response.data
            })

        setFlashMessage(data.message, msgType)

        if (msgType !== 'error') {
            history('/')
        }
    }

    return (
        <div>
            <h1>AddImages</h1>
            <ImageForm handleSubmit={imagesUp} btnText='Adicionar' />
        </div>
    )
}

export default AddImages