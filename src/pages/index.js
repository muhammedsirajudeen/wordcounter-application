import Navbar from "@/components/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
export default function Home() {
  const [url,setUrl]=useState("https://")
  const [clicked,setClicked]=useState(false)
  const httpUrlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
  const [loading,setLoading]=useState(false)
  const [insight,setInsight]=useState(undefined)
  const [fav,setFav]=useState(false)
  useEffect(()=>{
    async function preloadDB(){
      let response=(await axios.get("/api/hello")).data
      console.log(response)

    }
    preloadDB()
  },[])
  async function clickHandler(){
    
    if(url?.length===0){
      alert("please enter the url")
      
    }
    else if(!httpUrlRegex.test(url)){
      alert("please enter a valid url")
    }
   else{
    setClicked(true)

    setLoading(true)
    let response=(await axios.post("/api/scraper/wordscraper",
    {
      url:url
    }
    )).data
    console.log(response)
    setInsight(response)
    setLoading(false)
    setClicked(false)
   }
  }
  function favHandler(e){
    if(fav){
      setFav(false)
    }else{
      setFav(true)
    }
    
  }
  return (
    <>
     <Navbar/>
      <div className=' flex w-screen h-screen items-center flex-col justify-center '>
     
        <div className='flex flex-col items-center justify-evenly h-40'>
            <input className="text-black" type="text" placeholder="enter website url" value={url} onChange={(e)=>setUrl(e.target.value)}  ></input>
            <button className="border border-white" disabled={clicked} onClick={clickHandler}  >Get Insights</button>
        </div>

        <div className="w-screen results-container flex flex-col items-center justify-start">
  <p className="font-bold text-xl">RESULTS</p>
  <div className="flex w-full flex-col justify-center items-center mt-4 space-y-4">
    <div className="flex justify-evenly items-center w-full">
      <div className="flex-1 border p-2">Domain</div>
      <div className="flex-1 border p-2">WordCount</div>
      <div className="flex-1 border p-2">Favourite</div>
      <div className="flex-1 border p-2">Links</div>
      <div className="flex-1 border p-2">Media</div>
      <div className="flex-1 border p-2">Add to Fav</div>

    </div>
    
    {loading ? (
      <div className="loader mt-5"></div>
    ) : (
      <div className={` ${insight ? "" : "invisible" } flex justify-evenly items-center w-full text-xs`}>
        <div className="flex-1 border p-2">{insight?.domain}</div>
        <div className="flex-1 border p-2">{insight?.wordlength}</div>
        <div className="flex-1 border p-2">{insight?.favorite}</div>
        <div className="flex-1 border p-2">
          {insight ? (
            <div>
              
              <button className="text-blue-500" id={insight._id} >View hyperlinks</button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex-1 border p-2"  >
          {insight ? <button className="text-blue-500" id={insight._id} >View media links</button> : ""}
        </div>
            <div className={`flex-1 p-2 flex justify-center  ${insight? "" :"invisible"}  `} >
              <button id={insight._id} onClick={favHandler}  ><Image id={insight._id} src={fav ?  "/star.svg" :"/whitestar.svg" } width={30} height={30} alt="image" ></Image></button>

            </div>
      </div>
    )}
  </div>
</div>

    </div>
    </>

  )
}
