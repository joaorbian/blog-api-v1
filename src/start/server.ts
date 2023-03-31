import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from "helmet"
import bodyParser from 'body-parser'
import { usersRouter } from '../routes/users.routes'
import { articlesRouter } from '../routes/articles.routes'

dotenv.config()

const app = express()
const PORT = 3333

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(bodyParser())
app.use(usersRouter)
app.use(articlesRouter)
app.use('/articles/:id', express.static('tmp'))

// DATABASE CONNECTION
const sequelize = require('../config/database/database')
sequelize.authenticate().then(() => {
	console.log('Database connected!')
}).catch((error: string) => console.log(error))


sequelize.sync().then(() => {
	app.listen(PORT, () => console.log(`Aplication running in http://localhost:${PORT}`))
}).catch((error: string) => console.log(error))