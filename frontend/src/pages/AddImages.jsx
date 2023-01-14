import styles from './AddImages.module.css'
import { useState } from 'react';


import Input from '../components/Input'

const AddImages = () => {

    const [text, setText] = useState();
    console.log(text)
    return (
        <div>
            <h1>AddImages</h1>
            <Input
                text='Aqui é a label'
                type='text'
                name='teste'
                placeholder='Teste de input'
                handleChange={(e) => setText(e.target.value)}
                value={text}
            />
        </div>
    )
}

export default AddImages