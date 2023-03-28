import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from "helmet"
import bodyParser from 'body-parser'
import { UsersRouter } from '../routes/UsersRoutes'
import { articlesRouter } from '../routes/articles.routes'

dotenv.config()

const app = express()
const PORT = 3333

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(bodyParser())
app.use(UsersRouter)
app.use(articlesRouter)


// DATABASE CONNECTION
const sequelize = require('../config/database/database')
sequelize.authenticate().then(() => {
	console.log('Database connected!')
}).catch((error: string) => console.log(error))


sequelize.sync().then(() => {
	app.listen(PORT, () => console.log(`Aplication running in http://localhost:${PORT}`))
}).catch((error: string) => console.log(error))
