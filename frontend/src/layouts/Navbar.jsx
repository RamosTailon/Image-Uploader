import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <img src="../../public/image_uploader.svg" alt="logo icon" />
            <p>Image Uploader</p>
        </nav>
    )
}

export default Navbar