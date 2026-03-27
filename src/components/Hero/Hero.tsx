import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.grid} />
      </div>

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.dot} />
          Trusted Healthcare Support
        </div>

        <h1 className={styles.title}>
          Connecting Care,<br />
          <em>Changing Lives</em>
        </h1>

        <p className={styles.subtitle}>
          HealthConnect bridges patients with dedicated volunteers and healthcare professionals.
          Get the support you need, when you need it most.
        </p>

        <div className={styles.actions}>
          <a href="#register" className={styles.btnPrimary}>
            Get Support Today
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#volunteer" className={styles.btnSecondary}>
            Become a Volunteer
          </a>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>12,400+</span>
            <span className={styles.statLabel}>Patients Supported</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>3,200+</span>
            <span className={styles.statLabel}>Active Volunteers</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>98%</span>
            <span className={styles.statLabel}>Satisfaction Rate</span>
          </div>
        </div>
      </div>

      <div className={styles.visual}>
        <div className={styles.card1}>
          <div className={styles.cardIcon}>❤️</div>
          <div>
            <div className={styles.cardTitle}>Patient Care</div>
            <div className={styles.cardSub}>24/7 Support Available</div>
          </div>
        </div>
        <div className={styles.card2}>
          <div className={styles.cardIcon}>🤝</div>
          <div>
            <div className={styles.cardTitle}>Volunteer Network</div>
            <div className={styles.cardSub}>3,200+ caring helpers</div>
          </div>
        </div>
        <div className={styles.card3}>
          <div className={styles.cardIcon}>✅</div>
          <div>
            <div className={styles.cardTitle}>Verified & Safe</div>
            <div className={styles.cardSub}>All volunteers screened</div>
          </div>
        </div>
      </div>
    </section>
  )
}
