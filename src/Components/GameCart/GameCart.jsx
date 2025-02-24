import React from 'react';
import { FaFreeCodeCamp } from 'react-icons/fa';
import { motion } from 'framer-motion'; 
import { Link } from 'react-router-dom';

export default function GameCart({ product }) {
  return (
  
   <Link to={`/gamedetailes/${product.id} `}>
   
   <motion.div
      className="card p-4 rounded-lg shadow-md hover:shadow-lg flex flex-col justify-between"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }} 
    >
   
      <motion.img
        className="w-full h-52 p-4 object-cover rounded-b-sm"
        src={product.thumbnail}
        alt={product.title}
        whileHover={{ scale: 1.05 }} 
        transition={{ duration: 0.3 }} 
      />

     
      <div className="flex justify-between py-4">
        <motion.span
          className="text-lg font-semibold text-amber-500"
          whileHover={{ scale: 1.1, color: '#ffcc00' }} 
          transition={{ duration: 0.3 }}
        >
          {product.title.split(" ", 3).join(" ")}
        </motion.span>
        <motion.span
          className="text-amber-500"
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <FaFreeCodeCamp />
        </motion.span>
      </div>

     
      <motion.p
        className="text-sm text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }} 
      >
        {product.short_description.split(" ", 10).join(" ")}
      </motion.p>

     
      <div className="flex justify-between py-4 text-sm">
        <motion.span
          whileHover={{ scale: 1.1, color: '#ffcc00' }} 
          transition={{ duration: 0.3 }}
        >
          {product.genre}
        </motion.span>
        <motion.span
          whileHover={{ scale: 1.1, color: '#ffcc00' }} 
          transition={{ duration: 0.3 }}
        >
          {product.platform}
        </motion.span>
      </div>
    </motion.div>
   
   </Link>
  );
}
