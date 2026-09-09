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
 * `require(...)` shim for **externalized** modules. It rewrites every raw
 * `require("react")` from inlined CJS code (e.g. `use-sync-external-store`
 * pulled transitively by prosemirror / tiptap) into a call to that shim —
 * which throws at runtime in pure ESM environments (browsers, Vite dev):
 *   "Calling `require` for \"react\" in an environment that doesn't expose
 *    the `require` function".
 *
 * This plugin post-processes the final ESM bundle:
 *  1. Prepends namespace ESM imports for the externalized packages.
 *  2. Replaces the body of Rolldown's require shim so that calls like
 *     `S("react")` return the corresponding ESM namespace instead of
 *     throwing.
 */
function rewriteRequireForExternals(): Plugin {
  return {
    name: "rewrite-require-for-externals",
    enforce: "post",
    generateBundle(_options, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type !== "chunk") continue;

        const banner =
          `import * as __React from "react";\n` +
          `import * as __ReactDOM from "react-dom";\n` +
          `import * as __JSXRuntime from "react/jsx-runtime";\n` +
          `const __externals = {` +
          `"react": __React,` +
          `"react-dom": __ReactDOM,` +
          `"react/jsx-runtime": __JSXRuntime` +
          `};\n`;

        let code = file.code;

        // 1) Direct require("react") occurrences (defensive — most are
        //    already transformed by Rolldown into the shim call below).
        code = code
          .replace(/require\(\s*["']react["']\s*\)/g, "__React")
          .replace(/require\(\s*["']react-dom["']\s*\)/g, "__ReactDOM")
          .replace(
            /require\(\s*["']react\/jsx-runtime["']\s*\)/g,
            "__JSXRuntime",
          );

        // 2) Neutralize Rolldown's runtime require shim. Its body throws
        //    for unknown ids; we short-circuit it to return the matching
        //    ESM namespace. The shim always includes the exact string
        //    "Calling `require` for" in its error message — we use it as
        //    an anchor to locate and rewrite the function body.
        //
        //    Original (roughly):
        //      var S = (...)(function(e) {
        //        if (typeof require < "u") return require.apply(this, arguments);
        //        throw Error("Calling `require` for \"" + e + "\" ...");
        //      });
        code = code.replace(
          /function\s*\(([a-zA-Z_$][\w$]*)\)\s*\{\s*if\s*\(\s*typeof\s+require[\s\S]*?throw\s+Error\(\s*"Calling `require` for[\s\S]*?\}/,
          (_match, arg: string) =>
            `function(${arg}){` +
            `if(__externals[${arg}])return __externals[${arg}];` +
            `if(typeof require<"u")return require.apply(this,arguments);` +
            `throw Error("Calling \`require\` for \\""+${arg}+"\\" in an environment that doesn't expose the \`require\` function.");` +
            `}`,
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