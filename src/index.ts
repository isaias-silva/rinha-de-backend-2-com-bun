import { config } from 'dotenv'
import express from 'express'
import logger from './utils/logger'
import clients from './routes/clients.route'
import cors from 'cors'
config()
const app=express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use(clients)



app.listen(process.env.PORT,()=>{
    logger.info(`app running in port ${process.env.PORT}`)
})


