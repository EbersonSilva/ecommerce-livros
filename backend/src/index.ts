import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import clientesRouter from './routes/clientes'

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/api/clientes', clientesRouter)

app.get('/', (_, res) => res.json({ ok: true }))

const port = process.env.PORT || 5013
app.listen(port, () => console.log(`Backend rodando em http://localhost:${port}`))
