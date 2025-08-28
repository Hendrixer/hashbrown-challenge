import express from 'express'
import { HashbrownOpenAI } from '@hashbrownai/openai'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express)

app.post('/chat', async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' })
    }

    const stream = HashbrownOpenAI.stream.text({
      apiKey: process.env.OPENAI_API_KEY,
      request: req.body,
    })

    res.header('Content-Type', 'application/octet-stream')

    for await (const chunk of stream) {
      res.write(chunk)
    }

    res.end()
  } catch (error) {
    console.error('Error in chat endpoint:', error)
    res.status(500).json({ error: 'Failed to process chat request' })
  }
})

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

export default app
