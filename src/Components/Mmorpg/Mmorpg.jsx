import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import GameCart from "../GameCart/GameCart";
import ReactPaginate from "react-paginate"; // Import react-paginate

export default function Mmorpg() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);  // Total pages
  const [currentPage, setCurrentPage] = useState(0);  // Track the current page
  const productsPerPage = 8;  // Number of products per page

  // Fetch products from the API
  async function getProduct(page = 0) {
    setLoading(true);
    try {
      const { data } = await axios.get("https://free-to-play-games-database.p.rapidapi.com/api/games", {
        headers: {
          'x-rapidapi-key': 'b465cd8bf9msh187fc2ea1216017p10af73jsn26eca919f217',
          'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
      });

      // Set the products data
      setProduct(data);
      setPageCount(Math.ceil(data.length / productsPerPage)); // Calculate total pages
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  // Handle page change
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    getProduct(selectedPage.selected);  // Fetch data for the selected page
  };

  // Handle "Next" button click
  const handleNextClick = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
      getProduct(currentPage + 1);
    }
  };

  // Handle "Previous" button click
  const handlePrevClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      getProduct(currentPage - 1);
    }
  };

  useEffect(() => {
    getProduct();
  }, []); // Initial load

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

  // Slice the products based on current page
  const currentProducts = product.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage);

  return (
    <div className="max-w-screen-xl mx-auto mt-6">
      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((p) => (
          <GameCart key={p.id} product={p} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-between items-center mt-6">
        {/* Previous Button */}
        <button
          className="px-4 py-2 bg-[#041D29] text-white rounded-md"
          onClick={handlePrevClick}
          disabled={currentPage === 0}
        >
          Previous
        </button>

        {/* Page Number Display */}
        <span className="text-xl font-semibold">
          Page {currentPage + 1} of {pageCount}
        </span>

        {/* Next Button */}
        <button
          className="px-4 py-2 bg-[#041D29] text-white rounded-md"
          onClick={handleNextClick}
          disabled={currentPage === pageCount - 1}
        >
          Next
        </button>
      </div>

      {/* ReactPaginate (optional) */}
      <div className="mt-6">
        {/* <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          previousClassName={"previous-item"}
          nextClassName={"next-item"}
        /> */}
      </div>
    </div>
  );
}
