import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import pages from "vite-plugin-pages"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  base: loadEnv(mode, "./").VITE_BASEURL,
  plugins: [
    react(),
    pages({
      dirs: "src/samples",
    }),
  ],
}))
