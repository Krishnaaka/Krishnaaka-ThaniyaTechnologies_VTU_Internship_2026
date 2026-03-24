const express = require('express')
const cors    = require('cors')
const app     = express()
const PORT    = 4000

app.use(cors())
app.use(express.json())

// In-memory store (extend with nodemailer if you add an SMTP server)
const messages = []

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Required fields missing' })
  }
  const entry = { name, email, subject, message, timestamp: new Date().toISOString() }
  messages.push(entry)
  console.log('\n📬 New message received:')
  console.log(`   From:    ${name} <${email}>`)
  console.log(`   Subject: ${subject || '(none)'}`)
  console.log(`   Message: ${message}`)
  res.json({ ok: true, message: 'Message received!' })
})

app.get('/api/messages', (req, res) => res.json(messages))

app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio API running at http://localhost:${PORT}`)
  console.log(`   POST /api/contact — receive messages`)
})
