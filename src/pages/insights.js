import WebLink from "@/components/WebLink"
import axios from "axios"
import { useEffect, useState } from "react"
import Image from "next/image"
//in this function we take all the insights and show them here its easy nothing to add
export default function ViewInsights(){
    const [insights,setInsights]=useState([])
    const [weblink,setWeblink]=useState(false)
    const [medialink,setMedialink]=useState(false)
    const [loading,setLoading]=useState(true)
    const [id,setId]=useState("")
    useEffect(()=>{
        async function getInsights(){
            let response=(await axios.get("/api/scraper/getinsights")).data
            console.log(response)
            setInsights(response.insights)
            setLoading(false)
        }
        getInsights()
    },[])
    function weblinkHandler(e){
    
        setId(e.target.id)
        setWeblink(true)
    }
    function medialinkHandler(e){
        setId(e.target.id)
        setMedialink(true)
    }
    async function favHandler(e){
        const id=e.target.id
        const idOnly=e.target.id.split(/\s+/)[0]
        const fav=JSON.parse(e.target.id.split(/\s+/)[1])
        console.log(fav)
        if(fav){
            let element=document.querySelector(`img[data-id="${idOnly}"]`)
            element.src="/whitestar.svg"
            element.id=idOnly+" "+false.toString()
            let response=(await axios.put(`/api/scraper/addtofav?id=${idOnly}&value=false`)).data
            console.log(response)
            
            
          }else{
            let element=document.querySelector(`img[data-id="${idOnly}"]`)
            element.src="/star.svg"
            element.id=idOnly+" "+true.toString()

            let response=(await axios.put(`/api/scraper/addtofav?id=${idOnly}&value=true`)).data
            console.log(response)
          }
    }
    async function deleteHandler(e){
        console.log(e.target.id)
        let response=(await axios.delete(`/api/scraper/deletebyid?id=${e.target.id}`)).data
        if(response.message==="success"){
            alert("data deleted")
            setInsights(insights.filter((value)=> value._id!==e.target.id ))
        }

    }
    return(
        <>
        <div className="maincontainer flex flex-col items-center justify-center">
            <div className="flex items-center justify-evenly text-xs w-screen">
                <div className="flex-1 border p-2">Domain</div>
                <div className="flex-1 border p-2">WordCount</div>
                <div className="flex-1 border p-2">Links</div>
                <div className="flex-1 border p-2">Media</div>
                <div className="flex-1 border p-2">Add to Fav</div>
                <div className="flex-1 border p-2">Remove</div>
            </div>
            {loading? <div className="loader"></div> : 
                        insights.map((value)=>{
                            return(
                                <div className="flex items-center justify-evenly text-xs w-screen text-white" key={value._id} >
                                    <div className="flex-1 border p-2"> {value.domain} </div>
                                    <div className="flex-1 border p-2"> {value.wordlength} </div>
                                    <div className="flex-1 border p-2">
                                        <button id={value._id} className=" text-blue-500" onClick={weblinkHandler}>view links</button>
                                    </div>
                                    <div className="flex-1 border p-2">
                                        <button id={value._id} className="text-blue-500" onClick={medialinkHandler}>view media</button>
                                    </div>
                                    <div className={`flex-1 p-2 flex justify-center  `} >
                                         <button onClick={favHandler}  ><img data-id={value._id} id={value._id+" "+value.favorite.toString()} src={value.favorite ?  "/star.svg" :"/whitestar.svg" } width={30} height={30} alt="image" /></button>
            
                                    </div>
                                    <div className="flex-1 p-2 justify-center">
                                        <button onClick={deleteHandler}> <img src="/delete.svg" alt="delete" id={value._id} height={40} width={40} />   </button>
                                    </div>
                                </div>
            
                            )
                        })
            
            }

        </div>
        {weblink ? <WebLink resource="hyperlinks" id={id} setWeblink={setWeblink} />:<div></div>}   
        {medialink? <WebLink resource="medialinks" id={id} setWeblink={setMedialink} /> : <div></div> }
        </>
    )
}