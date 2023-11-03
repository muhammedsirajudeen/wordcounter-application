import axios from "axios"
import { useEffect, useState } from "react"
import Image from "next/image"
export default function WebLink({resource,id,setWeblink}){
    console.log(id)
    const [links,setLinks]=useState([])
    const rescopy=resource
    useEffect(()=>{
        async function getWebLinks(){
            let response=(await axios.get(`/api/scraper/getresourcebyid?id=${id}&resource=${resource}`)).data
            console.log(response)
            setLinks(response.hyperlinks)
        }
        getWebLinks()
    },[])
    function closeHandler(){    
        setWeblink(false)
    }
    return(
      
        <div className="  fixed top-0  bottom-0 w-screen h-screen flex items-center justify-center  ">
     
        <div className="flex weblinkcontainer bg-white flex-col text-black w-96 h-96 rounded-lg items-center ">
          <button onClick={closeHandler} >x</button>
          {rescopy==="hyperlinks" ?
                    links.map((value)=>{
                        return(
                            <a className=" text-xs" href={value}>{value}</a>
                        )
                      })
                :
                <div className="flex w-full items-center justify-evenly flex-wrap"> 
                {links.map((value)=>{
                    return(
                       
                             <a href={value}> <img className="flex-1 p-2 bg-black" src={value} alt="image" height={30} width={40} ></img> </a>
                     
                    )
                })}
                   </div>
        }

        </div>
      </div>
    )
}