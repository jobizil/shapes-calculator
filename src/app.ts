import express from 'express'
import dotenv from 'dotenv'
import { router } from './routes/'
dotenv.config()
const app = express()

const port: number = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)
app.listen(port, (): void => {
  console.log(`Server running on ${port}`)
})
