import { defineConfig } from "vite";

export default defineConfig({
  base: "https://tmf-code.github.io/lizards/",
  server: {
    host: true,
    https: false,
  },
});
