import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
    typeof __dirname !== "undefined"
        ? __dirname
        : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      include: ['src'],
      exclude: [
        'src/**/*.stories.ts',
        'src/**/*.stories.tsx',
        'src/**/*.test.ts',
        'src/**/*.test.tsx'
      ]
    })
  ],

  build: {
    lib: {
      entry: path.resolve(dirname, "src/index.ts"),
      name: "AghUI",
      formats: ["es"],
      fileName: () => "index.js",
      cssFileName: "style",
    },
    // Some TipTap / ProseMirror packages are shipped as CommonJS. Without
    // this option, the produced bundle keeps raw `require(...)` calls which
    // blow up in pure ESM environments (Vite dev server, modern browsers)
    // with: `Calling require for "react" in an environment that doesn't
    // expose the require function`.
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/],
    },
    rollupOptions: {
      // Only React stays external — it MUST be provided by the host app as a
      // peer dependency, otherwise hooks break because of duplicated React
      // instances. TipTap & ProseMirror are bundled in so consuming apps
      // don't have to install them manually.
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
  optimizeDeps: {
    include: [
      "@tiptap/react",
      "@tiptap/pm",
      "@tiptap/starter-kit",
      "@tiptap/extension-link",
      "@tiptap/extension-placeholder",
    ],
  },
});