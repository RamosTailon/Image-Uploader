import styles from './Input.module.css'

const Input = ({
    text,
    type,
    name,
    placeholder,
    handleChange,
    value,
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
                onChange={handleChange}
                value={value}
            // multiple={multiple}
            />
        </div>
    )
}

export default Input