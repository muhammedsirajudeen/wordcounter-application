import Insights from "@/model/Insight"
import mongoose from "mongoose";
import connectDB from "@/dbHelper/connectDB";
const cheerio=require("cheerio")
import axios from "axios";
export default async function handler(req,res){
    let url=req.body.url
    if(mongoose.connection.readyState===0){
        await connectDB()
    }
    if(req.method==="POST"){
        try{

            let response=(await axios.post(process.env.URL,{url:url})).data
            console.log(response)
            let newInsight=new Insights({domain:url,wordlength:response.wordlength,hyperlinks:response.hyperlinks,medialinks:response.medialinks})
            let doc=await newInsight.save()
            console.log(doc.domain)
            res.status(200).json({message:"success",_id:doc._id.toHexString(),domain:url,wordlength:doc.wordlength,hyperlinks:doc.hyperlinks,medialinks:doc.medialinks})
        }catch(error){
            console.log(error)
            res.status(500).json({message:"error"})
        }
    }


}