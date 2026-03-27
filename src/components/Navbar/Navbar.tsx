import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark}>HC</span>
          <span className={styles.logoText}>HealthConnect</span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <a href="#patients" className={styles.navLink} onClick={() => setMenuOpen(false)}>Patients</a>
          <a href="#volunteer" className={styles.navLink} onClick={() => setMenuOpen(false)}>Volunteer</a>
          <a href="#contact" className={styles.navLink} onClick={() => setMenuOpen(false)}>Contact</a>
          <NavLink
            to="/manage"
            className={({ isActive }) => `${styles.navLink} ${styles.manageLink} ${isActive ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Manage
          </NavLink>
        </nav>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
        </button>
      </div>
    </header>
  )
}
