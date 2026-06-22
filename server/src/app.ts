import express from "express"
import dns from "dns"
import cookieParser from "cookie-parser"
import authRouter from "./routes/authRoutes/auth.route.js";

// set db dns
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// config express
const app = express()

// express json

app.use(express.json())
app.use(cookieParser())

// auth routes
app.use("/api/auth",authRouter)




//export app

export default app