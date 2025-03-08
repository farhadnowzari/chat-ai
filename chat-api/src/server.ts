import express, { Application } from 'express'
import cors from 'cors'
import config from './config'
import { registerRoutes } from './routes'
const app: Application = express()

app.use(express.json())
app.use(cors())

registerRoutes(app)

app.listen(config.app.port, config.app.host, () => {
    console.log(`Server is running on http://${config.app.host}:${config.app.port}`)
})