import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["apple-touch-icon.png"],
      manifest: {
        id: "/",
        name: "دهب العربي",
        short_name: "دهب العربي",
        description:
          "أسعار الذهب والفضة لحظة بلحظة في مصر: عيار 24 و21 و18، السبائك والمشغولات.",
        lang: "ar",
        dir: "rtl",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#111111",
        theme_color: "#000000",
        categories: ["finance", "business", "shopping"],
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          {
            src: "/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
        // Social-preview image is fetched by crawlers only, never by the app.
        globIgnores: ["**/og-image.png"],
        // No runtimeCaching by design: the gold/silver price API must always
        // hit the network so users never see a stale price.
        runtimeCaching: [],
        navigateFallbackDenylist: [/^\/api\//],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
});
