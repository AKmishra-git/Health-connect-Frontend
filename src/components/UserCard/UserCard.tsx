import styles from './UserCard.module.css'

export type UserType = 'patient' | 'volunteer' | 'contact'

export interface User {
  id: number
  name: string
  type: UserType
  email: string
  phone?: string
  detail: string
  status: 'Active' | 'Pending' | 'Resolved'
  date: string
  avatar: string
}

const STATUS_COLOR: Record<string, string> = {
  Active: '#1e8a5e',
  Pending: '#b07c0a',
  Resolved: '#5a7570',
}

const TYPE_ICON: Record<UserType, string> = {
  patient: '🏥',
  volunteer: '🤝',
  contact: '✉️',
}

export default function UserCard({ user }: { user: User }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>{user.avatar}</div>
        <div className={styles.info}>
          <h3 className={styles.name}>{user.name}</h3>
          <span className={styles.type}>
            {TYPE_ICON[user.type]} {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
          </span>
        </div>
        <span
          className={styles.status}
          style={{ color: STATUS_COLOR[user.status], background: STATUS_COLOR[user.status] + '18' }}
        >
          {user.status}
        </span>
      </div>

      <div className={styles.body}>
        <p className={styles.detail}>{user.detail}</p>
      </div>

      <div className={styles.footer}>
        <div className={styles.contact}>
          <span className={styles.contactItem}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {user.email}
          </span>
          {user.phone && (
            <span className={styles.contactItem}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.63 19.79 19.79 0 01.01 5.01 2 2 0 012 2.84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              {user.phone}
            </span>
          )}
        </div>
        <span className={styles.date}>{user.date}</span>
      </div>
    </div>
  )
}
