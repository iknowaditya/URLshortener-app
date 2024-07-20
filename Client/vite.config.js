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

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://urlshortener-app-backend.onrender.com",
//         changeOrigin: true,
//         secure: false, // Set to true if using HTTPS
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
// });
