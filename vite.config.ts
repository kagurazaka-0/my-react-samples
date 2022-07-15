import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import pages from "vite-plugin-pages"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  base: loadEnv(mode, "./").VITE_BASEURL,
  plugins: [
    tsconfigPaths({
      projects: ["./tsconfig.web.json"],
    }),
    react(),
    pages({
      dirs: "src/samples",
    }),
  ],
}))
