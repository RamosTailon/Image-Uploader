import styles from './ImageForm.module.css'
import { useState, useEffect } from 'react';
import Input from './Input'

//HOOKS
import useFlashMessage from '../hooks/useFlashMessage'

//UTILS
import api from '../utils/api'

const ImageForm = ({ handleSubmit, imageData, btnText }) => {
    const { setFlashMessage } = useFlashMessage()
    const [images, setImages] = useState(imageData || {});
    const [preview, setPreview] = useState([]);

    function onFileChange(e) {
        setPreview(Array.from(e.target.files))
        setImages({ ...images, images: [...e.target.files] })
        console.log([...e.target.files])
    }

    function handleChange(e) {
        setImages({ ...images, [e.target.name]: e.target.value })
    }

    function submit(e) {
        e.preventDefault()
        handleSubmit(images)
    }

    return (
        <section>
            <div>
                {preview.length > 0
                    ? preview.map((image, index) => (
                        <img
                            src={URL.createObjectURL(image)}
                            alt={images.name}
                            key={`${images.name}+${index}`}
                        />
                    ))
                    : images.images &&
                    images.images.map((image, index) => (
                        <img
                            src={`${process.env.REACT_APP_API}/img/${image}`}
                            alt={images.name}
                            key={`${images.name}+${index}`}
                        />
                    ))}
            </div>
            <form onSubmit={submit} className={styles.form_container}>
                <Input
                    text='Imagens'
                    type='file'
                    name='images'
                    handleOnChange={onFileChange}
                    multiple={true}
                />
                <Input
                    text='Descrição'
                    type='text'
                    name='name'
                    placeholder='Adicione uma descrição'
                    handleOnChange={handleChange}
                    value={images.name || ''}
                />
                <Input
                    text='Classificação'
                    type='number'
                    name='rating'
                    min={1}
                    max={5}
                    placeholder='Adicione uma classificação'
                    handleOnChange={handleChange}
                    value={images.rating || ''}
                />
                <input type="submit" value={btnText} />
            </form>
        </section>
    )
}

export default ImageForm