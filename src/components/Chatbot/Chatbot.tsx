
import { useState, useRef, useEffect } from 'react'
import styles from './Chatbot.module.css'

interface Message {
  id: number
  from: 'bot' | 'user'
  text: string
}

const RULES: [string[], string][] = [
  [['hello', 'hi', 'hey'], "Hello! 👋 I'm your HealthConnect assistant. How can I help you today?"],
  [['volunteer'], "To volunteer:\n1. Fill the volunteer form\n2. Get approved\n3. Start helping 🤝"],
  [['patient', 'register'], "Register as a patient via the form above. We'll connect you within 24 hours."],
  [['emergency'], "🚨 Call 911 immediately!\nOr use crisis helpline: 988"],
]

async function getBotReply(input: string): Promise<string> {
  const lower = input.toLowerCase()

  // 🔥 Rule-based first
  for (const [keywords, reply] of RULES) {
    if (keywords.some(k => lower.includes(k))) {
      return reply
    }
  }

  // 🔥 AI fallback
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input })
    })

    if (!res.ok) {
      throw new Error("API request failed")
    }

    const data = await res.json()
    return data.reply || "Sorry, I couldn't understand that."

  } catch (err) {
    console.error(err)
    return "⚠️ AI is currently unavailable."
  }
}

let idCounter = 0

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: ++idCounter, from: 'bot', text: "Hi 👋 Ask me anything about HealthConnect!" }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = async () => {
    const text = input.trim()
    if (!text) return

    const userMsg: Message = { id: ++idCounter, from: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    try {
      const reply = await getBotReply(text)
      await new Promise(res => setTimeout(res, 500))

      const botMsg: Message = {
        id: ++idCounter,
        from: 'bot',
        text: reply
      }

      setMessages(prev => [...prev, botMsg])

    } catch (err) {
      setMessages(prev => [
        ...prev,
        { id: ++idCounter, from: 'bot', text: "⚠️ Something went wrong." }
      ])
    } finally {
      setTyping(false)
    }
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        className={`${styles.bubble} ${open ? styles.bubbleOpen : ''}`}
        onClick={() => setOpen(!open)}
      >
        {open ? '✖' : '💬'}
      </button>

      {/* Chat Window */}
      {open && (
        <div className={styles.window}>

          <div className={styles.winHeader}>
            <div className={styles.botAvatar}>HC</div>
            <div>
              <div className={styles.botName}>HealthConnect AI</div>
              <div className={styles.botStatus}>Online</div>
            </div>
          </div>

          <div className={styles.messages}>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`${styles.msg} ${msg.from === 'user' ? styles.userMsg : styles.botMsg}`}
              >
                {msg.from === 'bot' && <div className={styles.msgAvatar}>HC</div>}
                <div className={styles.bubble2}>
                  {msg.text.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < msg.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {typing && (
              <div className={`${styles.msg} ${styles.botMsg}`}>
                <div className={styles.msgAvatar}>HC</div>
                <div className={`${styles.bubble2} ${styles.typingBubble}`}>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className={styles.quickActions}>
            <button onClick={() => setInput("How to volunteer?")}>Volunteer</button>
            <button onClick={() => setInput("Register as patient")}>Patient</button>
            <button onClick={() => setInput("Emergency help")}>Emergency</button>
          </div>

          <div className={styles.inputRow}>
            <input
              className={styles.chatInput}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Type your message..."
            />

            <button className={styles.sendBtn} onClick={send} disabled={!input.trim()}>
              ➤
            </button>
          </div>

        </div>
      )}
    </>
  )
}

