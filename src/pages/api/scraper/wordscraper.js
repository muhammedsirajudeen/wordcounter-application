const puppet=require("puppeteer")
import Insights from "@/model/Insight"
const { v4: uuidv4 } = require('uuid');

export default async function handler(req,res){
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
        res.status(200).json({message:"success",_id:doc._id.toHexString(),domain:url,favorite:"false",wordlength:words.length,hyperlinks:links,medialinks:media})
    }catch(error){
        console.log(error)
        res.status(200).json({message:"error"})
    }

}