import express from "express"
import dns from "dns"

// set db dns
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// config express
const app = express()

// express json

app.use(express.json())

//export app

export default app