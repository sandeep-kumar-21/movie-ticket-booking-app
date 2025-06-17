import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import ConnectDB from './config/db.js'
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
const app = express()

config()
ConnectDB()
const port = process.env.PORT;

//Middleware
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get('/', (req, res) => {
  res.send('Movie ticket booking server')
})

app.listen(port, () => {
  console.log(`Server running at: \x1b[34mhttp://localhost:${port}\x1b[0m`);
});
