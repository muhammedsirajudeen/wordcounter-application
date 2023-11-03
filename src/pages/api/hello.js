// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/dbHelper/connectDB"
import mongoose from "mongoose"
export default async function handler(req, res) {
  if(mongoose.connection.readyState===0){
    await connectDB()
}
  res.status(200).json({ name: 'John Doe' })
}
