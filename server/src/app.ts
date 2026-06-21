import express from "express"
import dns from "dns"
import authRouter from "./routes/authRoutes/auth.route.js";

// set db dns
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// config express
const app = express()

// express json

app.use(express.json())

// auth routes
app.use("/api/auth",authRouter)




//export app

export default app