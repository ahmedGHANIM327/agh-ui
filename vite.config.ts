import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
    typeof __dirname !== "undefined"
        ? __dirname
        : path.dirname(fileURLToPath(import.meta.url));

/**
 * Rolldown (used by Vite 8) inlines CommonJS dependencies but keeps a runtime
 * `require(...)` shim for **externalized** modules. When a transitive CJS
 * dependency (e.g. `use-sync-external-store` pulled by prosemirror) contains
 * `require("react")`, the generated bundle calls that shim at runtime and
 * throws:
 *   "Calling `require` for \"react\" in an environment that doesn't expose
 *    the `require` function".
 *
 * This plugin rewrites those `require("<external>")` calls in the final ESM
 * bundle to reference the ESM namespace imports that Rolldown already emits
 * at the top of the file (React, ReactDOM, jsxRuntime).
 */
function rewriteRequireForExternals(): Plugin {
  return {
    name: "rewrite-require-for-externals",
    enforce: "post",
    generateBundle(_options, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type !== "chunk") continue;

        // Prepend explicit namespace imports we can point require() to.
        const banner =
          `import * as __React from "react";\n` +
          `import * as __ReactDOM from "react-dom";\n` +
          `import * as __JSXRuntime from "react/jsx-runtime";\n`;

        let code = file.code;

        // Replace every `require("react")` / `require('react')` (and the
        // other externals) with the matching namespace import. We also
        // handle the transpiled form `require\("react"\)` if present.
        code = code
          .replace(/require\(\s*["']react["']\s*\)/g, "__React")
          .replace(/require\(\s*["']react-dom["']\s*\)/g, "__ReactDOM")
          .replace(
            /require\(\s*["']react\/jsx-runtime["']\s*\)/g,
            "__JSXRuntime",
          );

        file.code = banner + code;
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
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
    rewriteRequireForExternals(),
  ],

  build: {
    lib: {
      entry: path.resolve(dirname, "src/index.ts"),
      name: "AghUI",
      formats: ["es"],
      fileName: () => "index.js",
      cssFileName: "style",
    },
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/],
    },
    rollupOptions: {
      // React stays external (peer dependency) to avoid duplicate instances
      // in the host app. TipTap / ProseMirror are bundled in.
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