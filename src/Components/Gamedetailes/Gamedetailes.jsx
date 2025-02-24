import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from "framer-motion";
export default function Gamedetailes() {
  const{id}=useParams()
  const [gamedetailess, setgamedetailess] = useState(null)
  const [loading, setLoading] = useState(true);
  async function getgamedeteiles()
  {
    setLoading(true)
    try{
    
   const{data}=await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, {
    headers: {
      'x-rapidapi-key': 'b465cd8bf9msh187fc2ea1216017p10af73jsn26eca919f217',
      'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
  });
   
  setgamedetailess(data)
  }
  catch(error){
    console.log(error);
    
  }
  finally{
    console.log("done");
    setLoading(false)
  }
  }
  useEffect(()=>{
    getgamedeteiles()
  },[])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <motion.div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        ></motion.div>

        <motion.h2
          className="mt-4 text-2xl font-bold"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Loading, Please Wait...
        </motion.h2>

        <motion.p
          className="mt-2 text-gray-400"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          Fetching the best gaming experience for you! 🎮
        </motion.p>
      </div>
    );
  }




  return (
    <>
    <div className="max-w-screen-xl mx-auto grid grid-cols-12 mt-20  ">
      
      <div className="col-span-12  md:col-span-4 p-4 flex ">
        <img src={gamedetailess?.thumbnail}className='w-full  mx-auto self-center' alt="" />
        {/* <h2 className='text-center'>hussien</h2> */}
      </div>
      <div className="col-span-12  md:col-span-8 p-4 ">
        <p className='py-2'>  title: {gamedetailess?.title}</p>
        <p className='py-2'> category:{gamedetailess?.publisher}</p>
        <p className='py-2'>platform:{gamedetailess?.platform}platform</p>
        <p className='py-2'>status:{gamedetailess?.status}status</p>
        <p className='py-2'>discription:{gamedetailess?.short_description}</p>
        <div className="">
          <a href={gamedetailess?.game_url} target='_blank' >          <button  className=" border-2 bg-blue-600 rounded-xl hover:bg-blue-700 p-2 mt-2 border-blue-800 duration-200">showgame </button>
          </a>
        </div>
        
      </div>
      
      
      
      
      
      </div> 
    </>
  )
}
