import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import ConnectDB from './config/db.js'
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from './routes/showRoutes.js'
import bookingRouter from './routes/bookingRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import userRouter from './routes/userRoutes.js'
import { stripeWebhooks } from './controllers/stripeWebhooks.js'
const app = express()

config()
await ConnectDB()
const port = process.env.PORT;

// Stripe
app.use('/api/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

//Middleware
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

app.get('/', (req, res) => {res.send('Movie ticket booking server')})
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use('/api/show', showRouter)
app.use('/api/booking', bookingRouter)
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)

app.listen(port, () => {
  console.log(`Server running at: \x1b[34mhttp://localhost:${port}\x1b[0m`);
});
