import { useState } from 'react'
import styles from './FormSection.module.css'

type Tab = 'patient' | 'volunteer' | 'contact'

interface FormState {
  name: string
  email: string
  phone: string
  age: string
  condition: string
  availability: string
  skills: string
  message: string
  subject: string
}

interface Errors {
  [key: string]: string
}

const INITIAL: FormState = {
  name: '', email: '', phone: '', age: '',
  condition: '', availability: '', skills: '',
  message: '', subject: ''
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePhone(phone: string) {
  return /^\+?[\d\s\-()]{7,15}$/.test(phone)
}

export default function FormSection() {
  const [tab, setTab] = useState<Tab>('patient')
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<Errors>({})
  const [success, setSuccess] = useState(false)

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [key]: e.target.value }))
    if (errors[key]) setErrors(prev => { const n = { ...prev }; delete n[key]; return n })
  }

  const validate = (): boolean => {
    const e: Errors = {}

    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!validateEmail(form.email)) e.email = 'Enter a valid email address'

    if (tab === 'patient') {
      if (!form.phone.trim()) e.phone = 'Phone number is required'
      else if (!validatePhone(form.phone)) e.phone = 'Enter a valid phone number'
      if (!form.age.trim()) e.age = 'Age is required'
      else if (Number(form.age) < 1 || Number(form.age) > 120) e.age = 'Enter a valid age'
      if (!form.condition.trim()) e.condition = 'Please describe your condition'
    }

    if (tab === 'volunteer') {
      if (!form.phone.trim()) e.phone = 'Phone number is required'
      else if (!validatePhone(form.phone)) e.phone = 'Enter a valid phone number'
      if (!form.availability.trim()) e.availability = 'Please select availability'
      if (!form.skills.trim()) e.skills = 'Please describe your skills'
    }

    if (tab === 'contact') {
      if (!form.subject.trim()) e.subject = 'Subject is required'
      if (!form.message.trim()) e.message = 'Message is required'
      else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters'
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!validate()) return

  try {
    const payload: any = {
      type: tab,
      name: form.name,
      email: form.email,
    }

    if (tab === 'patient') {
      payload.age = Number(form.age)
      payload.concern = form.condition
    }

    if (tab === 'volunteer') {
      payload.skills = form.skills
      payload.availability = form.availability
    }

    if (tab === 'contact') {
      payload.message = form.message
    } // ⚠️ THIS closing brace is VERY important

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || "Submission failed")
    }

    setSuccess(true)
    setForm(INITIAL)
    setErrors({})

  } catch (err: any) {
    console.error(err)
    alert(err.message)
  }
}

  const switchTab = (t: Tab) => {
    setTab(t)
    setSuccess(false)
    setErrors({})
  }

  return (
    <section className={styles.section} id="register">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionLabel}>Get Involved</span>
          <h2 className={styles.title}>How Can We Help?</h2>
          <p className={styles.subtitle}>
            Whether you need support or want to give it — we're here for you.
          </p>
        </div>

        <div className={styles.card}>
          {/* Tabs */}
          <div className={styles.tabs} id="patients">
            {(['patient', 'volunteer', 'contact'] as Tab[]).map(t => (
              <button
                key={t}
                className={`${styles.tab} ${tab === t ? styles.activeTab : ''}`}
                onClick={() => switchTab(t)}
                id={t === 'volunteer' ? 'volunteer' : t === 'contact' ? 'contact' : undefined}
              >
                <span className={styles.tabIcon}>
                  {t === 'patient' ? '🏥' : t === 'volunteer' ? '🤝' : '✉️'}
                </span>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Success state */}
          {success ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✅</div>
              <h3 className={styles.successTitle}>Submission Received!</h3>
              <p className={styles.successMsg}>
                Thank you for reaching out. Our team will get back to you within 24 hours.
              </p>
              <button className={styles.successBtn} onClick={() => setSuccess(false)}>
                Submit Another
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>

              <div className={styles.row}>
                <Field label="Full Name" error={errors.name} required>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={update('name')}
                    className={errors.name ? styles.inputError : styles.input}
                  />
                </Field>

                <Field label="Email Address" error={errors.email} required>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={update('email')}
                    className={errors.email ? styles.inputError : styles.input}
                  />
                </Field>
              </div>

              {tab === 'patient' && (
                <>
                  <div className={styles.row}>
                    <Field label="Phone Number" error={errors.phone} required>
                      <input
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={form.phone}
                        onChange={update('phone')}
                        className={errors.phone ? styles.inputError : styles.input}
                      />
                    </Field>

                    <Field label="Age" error={errors.age} required>
                      <input
                        type="number"
                        placeholder="35"
                        min="1"
                        max="120"
                        value={form.age}
                        onChange={update('age')}
                        className={errors.age ? styles.inputError : styles.input}
                      />
                    </Field>
                  </div>

                  <Field label="Medical Condition / Reason for Support" error={errors.condition} required>
                    <textarea
                      placeholder="Please briefly describe what you need help with..."
                      value={form.condition}
                      onChange={update('condition')}
                      rows={4}
                      className={errors.condition ? styles.inputError : styles.input}
                    />
                  </Field>
                </>
              )}

              {tab === 'volunteer' && (
                <>
                  <div className={styles.row}>
                    <Field label="Phone Number" error={errors.phone} required>
                      <input
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={form.phone}
                        onChange={update('phone')}
                        className={errors.phone ? styles.inputError : styles.input}
                      />
                    </Field>

                    <Field label="Availability" error={errors.availability} required>
                      <select
                        value={form.availability}
                        onChange={update('availability')}
                        className={errors.availability ? styles.inputError : styles.input}
                      >
                        <option value="">Select availability</option>
                        <option>Weekday mornings</option>
                        <option>Weekday afternoons</option>
                        <option>Weekday evenings</option>
                        <option>Weekends</option>
                        <option>Flexible / On-call</option>
                      </select>
                    </Field>
                  </div>

                  <Field label="Skills & Experience" error={errors.skills} required>
                    <textarea
                      placeholder="Describe your relevant skills, certifications, or healthcare experience..."
                      value={form.skills}
                      onChange={update('skills')}
                      rows={4}
                      className={errors.skills ? styles.inputError : styles.input}
                    />
                  </Field>
                </>
              )}

              {tab === 'contact' && (
                <>
                  <Field label="Subject" error={errors.subject} required>
                    <input
                      type="text"
                      placeholder="How can we assist you?"
                      value={form.subject}
                      onChange={update('subject')}
                      className={errors.subject ? styles.inputError : styles.input}
                    />
                  </Field>

                  <Field label="Message" error={errors.message} required>
                    <textarea
                      placeholder="Tell us more about your inquiry..."
                      value={form.message}
                      onChange={update('message')}
                      rows={5}
                      className={errors.message ? styles.inputError : styles.input}
                    />
                  </Field>
                </>
              )}

              <button type="submit" className={styles.submitBtn}>
                {tab === 'patient' ? 'Request Support' : tab === 'volunteer' ? 'Join as Volunteer' : 'Send Message'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({ label, error, required, children }: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}