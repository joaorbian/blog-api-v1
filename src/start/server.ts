import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import helmet from "helmet"
import { usersRouter } from '../routes/users.routes'
import { articlesRouter } from '../routes/articles.routes'

dotenv.config({ path: '../.env' });

console.log('DB Configurations:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const app = express()
const PORT = 3333

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(express.urlencoded({ extended: true }));
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