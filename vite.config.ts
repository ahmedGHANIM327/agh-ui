import { defineConfig, esmExternalRequirePlugin } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
    typeof __dirname !== "undefined"
        ? __dirname
        : path.dirname(fileURLToPath(import.meta.url));

const isStorybook = process.env.STORYBOOK === "true";

export default defineConfig({
  plugins: [
    react(),

    // ⚠️ Ne pas externaliser react quand on build Storybook
    ...(isStorybook
        ? []
        : [
          esmExternalRequirePlugin({
            external: [
              "react",
              "react-dom",
              "react/jsx-runtime",
              "react/jsx-dev-runtime",
            ],
          }),
          dts({
            tsconfigPath: "./tsconfig.build.json",
            include: ["src"],
            exclude: [
              "src/**/*.stories.ts",
              "src/**/*.stories.tsx",
              "src/**/*.test.ts",
              "src/**/*.test.tsx",
            ],
          }),
        ]),
  ],

  ...(isStorybook
      ? {}
      : {
        build: {
          lib: {
            entry: path.resolve(dirname, "src/index.ts"),
            name: "AghUI",
            formats: ["es"],
            fileName: () => "index.js",
            cssFileName: "style",
          },
          rollupOptions: {},
        },
      }),
});
