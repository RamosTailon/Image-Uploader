import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logoImage}>
                <img src="/image_uploader.svg" alt="logo icon" />
                <p>Image Uploader</p>
            </div>

            <ul className={styles.lists}>
                <li><Link to='/'>Vitrine</Link></li>
                <li><Link to='/add'>Adicionar</Link></li>
            </ul>

        </nav>
    )
}

export default Navbar