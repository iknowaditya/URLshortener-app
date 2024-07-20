import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { config } from "dotenv";

// config(); // Load environment variables

// console.log("VITE_API_URL:", process.env.VITE_API_URL); // Check the value

export default defineConfig({
  server: {
    // proxy: {
    //   "/api": process.env.VITE_API_URL,
    // },
  },
  plugins: [react()],
});
