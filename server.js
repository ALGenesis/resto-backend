import express from 'express'
import dotenv from 'dotenv'
import { connectToDatabase } from './config/db.js'
import restoRoutes from './routes/resto.route.js'
import platRoutes from './routes/plat.route.js'
import clientRoutes from './routes/client.route.js'
import personnelRoutes from './routes/personnel.route.js'

dotenv.config()
const app = express()

connectToDatabase()

app.use(express.json())
app.use('/api/restos', restoRoutes)
app.use('/api/plat', platRoutes)
app.use('/api/client', clientRoutes)
app.use('/api/personnel', personnelRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server running on port : ', PORT)
})