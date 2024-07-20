import React, { useState, useEffect } from "react";
import axios from "axios";
import UrlsForm from "./UrlsForm";
import UrlList from "./UrlList";
import { Toaster, toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const MainUrl = () => {
  const [urls, setUrls] = useState([]);
  const [shortId, setShortId] = useState("");

  // Fetch URLs..
  const fetchUrls = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/url/shortUrl`);
      setUrls(res.data);
    } catch (err) {
      // console.error("Error fetching URLs:", err);
    }
  };

  // Delete URL..
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/url/shortUrl/${id}`);
      setUrls(urls.filter((url) => url._id !== id));
      toast.success("URL deleted successfully!");
    } catch (err) {
      console.error("Error deleting URL:", err);
      toast.error("Failed to delete URL.");
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []); // Trigger fetchUrls whenever shortId changes

  return (
    <div className="gradient-bg min-h-screen text-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl mb-8">
          Shrink Your Links with Ease
        </h2>
        <div className="mb-8">
          <UrlsForm
            setShortId={setShortId}
            shortId={shortId}
            fetchUrls={fetchUrls}
          />
        </div>
        <div className="mb-8">
          <UrlList urls={urls} handleDelete={handleDelete} />
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default MainUrl;
