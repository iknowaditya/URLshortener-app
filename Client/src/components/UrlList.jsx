import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import copyIcon from "../assets/copy.svg";
import deleteIcon from "../assets/delete.svg";
import moreIcon from "../assets/more.svg";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const UrlList = ({ urls = [], handleDelete }) => {
  const [expandedUrl, setExpandedUrl] = useState(null);

  // Check if urls is a valid array
  const isValidUrlsArray = Array.isArray(urls);

  // Create a variant for the row animation
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Format the date to a readable format
  const formatDate = (dateString) => {
    const options = { month: "short", day: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options).replace("", " ");
  };

  // Get Favicon URL
  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url).hostname;
      return `https://api.faviconkit.com/${domain}/32`;
    } catch (error) {
      console.error("Invalid URL", error);
      return "https://api.faviconkit.com/default/32";
    }
  };

  const toggleExpandedUrl = (urlId) => {
    setExpandedUrl(expandedUrl === urlId ? null : urlId);
  };

  // Handle Copy of shortUrl to clipboard
  const handleCopy = (shortId) => {
    const fullUrl = `${window.location.origin}/api/url/shortUrl/${shortId}`;
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        toast.success("URL copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy URL.");
        console.error("Failed to copy URL:", err);
      });
  };

  return (
    <div className="overflow-x-auto w-full max-w-6xl mx-auto py-16">
      <motion.table
        className="w-full bg-white text-neutral-800 shadow-md rounded-lg overflow-hidden"
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Original Link</th>
            <th className="py-2 px-4 text-left">Short Link</th>
            <th className="py-2 px-4">Clicks</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-center">Date</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {(!isValidUrlsArray || urls.length === 0) && (
            <tr>
              <td colSpan="6" className="py-4 text-center text-gray-500">
                No URLs found. Start shortening your links now!
              </td>
            </tr>
          )}
          {isValidUrlsArray && urls.length > 0
            ? urls.map((url) => (
                <motion.tr
                  key={url.shortId}
                  variants={rowVariants}
                  className="border-b"
                >
                  <td className="py-2 px-4 flex items-center space-x-2 w-96">
                    <img
                      src={getFaviconUrl(url.fullUrl)}
                      alt="Favicon"
                      className="w-5 h-5"
                    />
                    <div className="flex items-center justify-center">
                      <a
                        href={url.fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {`${url.fullUrl.slice(0, 30)}...`}
                      </a>
                      {url.fullUrl.length > 30 && (
                        <button
                          onClick={() => toggleExpandedUrl(url.shortId)}
                          className="text-blue-500 ml-2"
                        >
                          <img
                            src={moreIcon}
                            alt="More"
                            className="w-5 h-5 inline"
                          />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-4 truncate max-w-xs underline hover:text-blue-500">
                    <a
                      href={`${API_URL}/api/url/shortUrl/${url.shortId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {url.shortId}
                    </a>
                  </td>
                  <td className="py-2 px-4 text-center">
                    {url.visitHistory.length}
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        url.visitHistory.length > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {url.visitHistory.length > 0 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-center">
                    {formatDate(url.createdAt)}
                  </td>
                  <td className="py-2 px-4 text-center flex space-x-2 items-center">
                    <button
                      onClick={() => handleCopy(url.shortId)}
                      className="text-neutral-500 hover:text-neutral-950"
                    >
                      <img
                        src={copyIcon}
                        alt="Copy"
                        className="w-5 h-5 inline"
                      />
                    </button>
                    <button
                      onClick={() => handleDelete(url._id)}
                      className="text-neutral-500 hover:text-neutral-800 text-2xl"
                    >
                      <img
                        src={deleteIcon}
                        alt="Delete"
                        className="w-5 h-5 inline"
                      />
                    </button>
                  </td>
                </motion.tr>
              ))
            : null}
        </tbody>
      </motion.table>

      {expandedUrl && (
        <Dialog
          open={expandedUrl !== null}
          onClose={() => setExpandedUrl(null)}
          className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-black bg-opacity-50"
        >
          <DialogPanel className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg transform transition-all">
            <DialogTitle className="text-lg font-medium text-center">
              Full URL
            </DialogTitle>
            <Description className="mt-4 text-sm text-center break-words">
              {urls.find((url) => url.shortId === expandedUrl)?.fullUrl}
            </Description>
            <div className="mt-6 text-center">
              <button
                onClick={() => setExpandedUrl(null)}
                className="px-4 py-2 text-sm font-medium text-white bg-[#2C3E5D] rounded hover:bg-[#091E42]"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </Dialog>
      )}
    </div>
  );
};

export default UrlList;
