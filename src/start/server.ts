import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import { router } from '../routes/routes'

dotenv.config()

const app = express()
const PORT = 3333

app.use(express.json())
app.use(cors())
app.use(router)


// DATABASE CONNECTION
const sequelize = require('../config/database/database');
sequelize.authenticate()
.then(() => console.log('Database connected!'))
.catch(err => console.log('Error: ' + err));


sequelize.sync()
.then(() => {
  app.listen(PORT, () => console.log(`Aplication running in http://localhost:${PORT}`));
})
.catch(err => console.log("Error: " + err));
