import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Input } from "@headlessui/react";
import { toast } from "react-hot-toast";
import { FaLink, FaArrowRight } from "react-icons/fa";

// const API_URL = import.meta.env.VITE_API_URL;

const UrlsForm = ({ fetchUrls }) => {
  const [fullUrl, setFullUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullUrl) {
      toast.error("Please enter a URL");
      return;
    }
    try {
      const res = await axios.post(`https://urlshort-server.onrender.com/api/url/shortUrl`, {
        fullUrl: fullUrl,
      });
      console.log("Response from server:", res.data);
      toast.success("Short URL created successfully!");
      setFullUrl("");
      fetchUrls(); // Fetch the updated list of URLs
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error("Link already exists");
      } else {
        console.error("Error creating short URL:", err);
        toast.error("An error occurred while creating the short URL.");
      }
    }
  };

  // make a get request to the server to get the shortId of url from the server..

  const getShortUrl = async () => {
    try {
      const res = await axios.get(`https://urlshort-server.onrender.com/api/url/shortUrl/${shortId}`);
      console.log(res.data);
    } catch (err) {
      console.log("Error getting short URL:", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50 },
    },
  };

  return (
    <motion.div
      className="relative p-8 rounded-lg shadow-lg bg-gray-200 max-w-md mx-auto mt-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-2xl text-center font-bold mb-4 text-neutral-800">
        URL Shortener
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="w-full flex items-center bg-white rounded-full mb-4 p-2 shadow-inner">
          <FaLink className="text-gray-700 ml-2" />
          <Input
            type="text"
            placeholder="Enter URL"
            value={fullUrl}
            onChange={(e) => setFullUrl(e.target.value)}
            className="w-full p-2 text-neutral-800 rounded-full outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-[#2C3E5D] text-white py-2 px-4 rounded-full flex items-center hover:bg-[#091E42] transition-all duration-300"
        >
          <span className="mr-2">Shorten URL</span>
          <FaArrowRight />
        </button>
      </form>
    </motion.div>
  );
};

export default UrlsForm;
