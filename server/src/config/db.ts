// create databse function for comnnect database

import mongoose from "mongoose"
import { env } from "./env.js"

export const connectDb = async (): Promise<void>=>{
    try {
      await mongoose.connect(env.DB_URL,{
        dbName : "blogPlatfrom" ,
      })  
      console.log("Mongo db connected");
      
    } catch (error) {
        console.error(" Database Connection Failed", error);
    process.exit(1);
    }
}