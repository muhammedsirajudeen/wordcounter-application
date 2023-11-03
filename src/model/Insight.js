import mongoose from "mongoose";
let Insights;

if (mongoose.models && mongoose.models.Insights) {
  Insights = mongoose.models.Insights;
} else {
  const InsightSchema=new mongoose.Schema(
    {
        domain:String,
        wordlength:Number,
        hyperlinks:[String],
        medialinks:[String]

    }
  )

  Insights = mongoose.model('Insights', InsightSchema);
}

export default Insights;