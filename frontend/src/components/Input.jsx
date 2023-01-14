import styles from './Input.module.css'

const Input = ({
    text,
    type,
    name,
    placeholder,
    handleOnChange,
    value,
    min,
    max,
    multiple
}) => {
    return (
        <div className={styles.InputModel}>
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                min={min}
                max={max}
                {...(multiple ? { multiple } : '')}
            />
        </div>
    )
}

export default Input