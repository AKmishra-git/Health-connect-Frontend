import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserCard, { type UserType } from '../../components/UserCard/UserCard'
import styles from './Manage.module.css'

type FilterType = 'all' | UserType

const FILTER_OPTIONS: { value: FilterType; label: string; icon: string }[] = [
  { value: 'all', label: 'All Users', icon: '👥' },
  { value: 'patient', label: 'Patients', icon: '🏥' },
  { value: 'volunteer', label: 'Volunteers', icon: '🤝' },
  { value: 'contact', label: 'Contacts', icon: '✉️' },
]

export default function Manage() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/registrations`)
        const data = await res.json()
        setUsers(data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const filtered = useMemo(() => {
    return users.filter(u => {
      const matchType = filter === 'all' || u.type === filter
      const q = search.toLowerCase()

      const detail = u.concern || u.skills || u.message || ""

      const matchSearch =
        !q ||
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        detail.toLowerCase().includes(q)

      return matchType && matchSearch
    })
  }, [filter, search, users])

  const counts = useMemo(() => ({
    all: users.length,
    patient: users.filter(u => u.type === 'patient').length,
    volunteer: users.filter(u => u.type === 'volunteer').length,
    contact: users.filter(u => u.type === 'contact').length,
  }), [users])

  if (loading) return <p>Loading...</p>

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <Link to="/">← Back</Link>

        {FILTER_OPTIONS.map(opt => (
          <button key={opt.value} onClick={() => setFilter(opt.value)}>
            {opt.label} ({counts[opt.value]})
          </button>
        ))}
      </aside>

      <main className={styles.main}>
        <input
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div>
          {filtered.map(user => (
            <UserCard
              key={user._id}
              user={{
                id: user._id,
                name: user.name,
                type: user.type,
                email: user.email,
                phone: user.phone || "",
                detail: user.concern || user.skills || user.message || "No details",
                status: "Active",
                date: new Date(user.createdAt).toDateString(),
                avatar: "👤"
              }}
            />
          ))}
        </div>
      </main>
    </div>
  )
}