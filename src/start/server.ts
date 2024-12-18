import express from 'express'
import cors from 'cors'
import { router } from '../routes/routes'

const app = express()
const PORT = 3333

app.use(express.json())
app.use(cors())
app.use(router)


app.listen(PORT, () => console.log('Aplicação funcionando'))