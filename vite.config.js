import { defineConfig } from "vite";
import vike from "vike/plugin";
import vercel from "vite-plugin-vercel";

export default defineConfig(async ({ command, mode }) => {
  return {
    plugins: [
      vike({
        redirects: {
          "/": "/year",
        },
      }),
      vercel(),
    ],
    resolve: {
      alias: {
        "#lib": __dirname + "/lib",
      },
    },
  };
});
