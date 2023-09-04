import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Specify additional rollup options if needed
    },
    // Copy assets during build
    assetsInlineLimit: 0, // Disable asset inlining to ensure asset files are copied
    outDir: "dist", // Output directory
    assetsDir: "assets", // Directory for assets
    assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif"], // Include image file types you want to copy
  },
});
