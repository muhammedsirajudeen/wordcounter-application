import mongoose from "mongoose";
import connectDB from "@/dbHelper/connectDB";
import Insights from "@/model/Insight";

export default async function handler(req,res){
    try{
        if(mongoose.connection.readyState===0){
            await connectDB()
        }
        if(req.method==='GET'){
            const {query}=req
            const id=query.id
            const resource=query.resource
            let doc=await Insights.findById(id)
            let reqdoc=doc[resource]
            res.status(200).json({message:"success",hyperlinks:reqdoc})
        
        }
    }catch(error){
        console.log(error)
        res.status(500).json({message:"error"})
    }
}