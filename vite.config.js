import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const _dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(_dirname, "lib/main.js"),
      name: "VueTagger",
      fileName: (format) => `${format}.js`,
    },
    rollupOptions: {
      external: ["vue", "sass"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(_dirname, "./lib"),
    },
  },
  plugins: [vue()],
});
