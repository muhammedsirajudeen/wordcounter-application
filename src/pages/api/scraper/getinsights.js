import Insights from "@/model/Insight"
import mongoose from "mongoose"
import connectDB from "@/dbHelper/connectDB"
export default async  function handler(req,res){
    try{
        if(mongoose.connection.readyState===0){
            await connectDB()
        }
        if(req.method==="GET"){
            let doc=await Insights.find()
            res.status(200).json({message:"success",insights:doc})
        }

    

    }catch(error){
        console.log(error)
        res.status(500).json({message:"error"})
    }

}