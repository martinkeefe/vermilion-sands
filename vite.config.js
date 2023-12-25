import { defineConfig } from "vite";
import ssr from "vike/plugin";
import vercel from "vite-plugin-vercel";

export default defineConfig(async ({ command, mode }) => {
  return {
    plugins: [ssr(), vercel()],
  };
});
