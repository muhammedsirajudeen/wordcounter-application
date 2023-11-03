const express=require("express")
const app=express()
const puppet=require("puppeteer")
const Insights=require("./Insights")

const connectDB=require("./connectDB")
const cors=require("cors")
app.use(express.json())
app.use(cors())

connectDB()

app.post("/api/scraper/wordscraper",async (req,res)=>{
        let url=req.body.url
        try{
            const browser=await puppet.launch()
            const page=await browser.newPage()
            await page.goto(url)
            const pageContent = await page.evaluate(() => {
                return document.body.innerText;
              });
            const words=pageContent.split(/\s+/)
    
              //getting all hyperlinks
            const links = await page.evaluate(() => {
                // Extract all anchor elements and get their href attributes
                const anchorElements = document.querySelectorAll('a');
                const linkList = Array.from(anchorElements, (a) => a.href);
            
                return linkList;
            });
    
            const media = await page.evaluate(() => {
                const mediaElements = Array.from(document.querySelectorAll('img, video'));
                const mediaUrls = mediaElements.map((element) => {
                  if (element.tagName === 'IMG') {
                    return element.src;
                  } else if (element.tagName === 'VIDEO') {
                    return element.src || element.currentSrc;
                  }
                });
                return mediaUrls;
              });
            
    
            let newInsight=new Insights({domain:url,wordlength:words.length,hyperlinks:links,medialinks:media})
            let doc=await newInsight.save()
            console.log(doc.domain)
            res.send({message:"success",_id:doc._id.toHexString(),domain:url,wordlength:words.length,hyperlinks:links,medialinks:media})
        }catch(error){
            console.log(error)
            res.send({message:"error"})
        }
})


app.listen(5000,()=>console.log("server created"))