import React, { useEffect, useState } from "react";
import axios from "axios";
import GameCart from "../GameCart/GameCart";
import { motion } from "framer-motion";

export default function Mmorpg() {
  const [game, setgame] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getProduct() {
    setLoading(true); 
    try {
      const { data } = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games', {
        params: {platform: 'pc'},
        headers: {
          'x-rapidapi-key': 'b465cd8bf9msh187fc2ea1216017p10af73jsn26eca919f217',
          'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
      });

      console.log(data);
      // (data);
     const x= data.filter((game) =>
      game.publisher === game.developer
     
      ).splice(0,11);
      setgame(x);
     ;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);
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
    
    <div className="   grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  max-w-screen-xl mx-auto mt-6">
      {game.map((p) => (
        <GameCart key={p.id} product={p}   />
      ))}
    </div>
  );
}
