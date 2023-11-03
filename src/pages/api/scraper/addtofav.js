import mongoose from "mongoose";
import connectDB from "@/dbHelper/connectDB";
import Insights from "@/model/Insight";

export default async function handler(req,res){
    try{
        if(mongoose.connection.readyState===0){
            await connectDB()
        }
    
        if(req.method==='PUT'){
            const {query}=req
            const id=query.id
            const value=query.value
            await Insights.findByIdAndUpdate(id,{favorite:value})
            res.status(200).json({message:"success"})
        
        }

    }catch(error){
        console.log(error)
        res.status(500).json({message:"success"})
    }

}