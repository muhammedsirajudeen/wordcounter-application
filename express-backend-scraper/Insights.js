const mongoose=require("mongoose")
let Insights;

if (mongoose.models && mongoose.models.Insights) {
  Insights = mongoose.models.Insights;
} else {
  const InsightSchema=new mongoose.Schema(
    {
        domain:String,
        wordlength:Number,
        favorite:{
          type:Boolean,
          default:false
        },
        hyperlinks:[String],
        medialinks:[String]

    }
  )

  Insights = mongoose.model('Insights', InsightSchema);
}

module.exports=Insights