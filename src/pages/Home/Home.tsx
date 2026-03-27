import Hero from '../../components/Hero/Hero'
import FormSection from '../../components/FormSection/FormSection'
import Chatbot from '../../components/Chatbot/Chatbot'
import styles from './Home.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <FormSection />
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <span className={styles.footerLogo}>HC</span>
            <span className={styles.footerName}>HealthConnect</span>
          </div>
          <p className={styles.footerTagline}>
            Bridging care, one connection at a time.
          </p>
          <div className={styles.footerLinks}>
            <a href="#patients">Patients</a>
            <a href="#volunteer">Volunteer</a>
            <a href="#contact">Contact</a>
          </div>
          <p className={styles.copyright}>© 2026 HealthConnect. All rights reserved.</p>
        </div>
      </footer>
      <Chatbot />
    </main>
  )
}
