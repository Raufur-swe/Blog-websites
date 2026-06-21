
import dotenv from "dotenv"

dotenv.config()

// env functions
export const env = {
    PORT : process.env.PORT || 5000,
    DB_URL : process.env.MONGO_URL!,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN!,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN!,
}