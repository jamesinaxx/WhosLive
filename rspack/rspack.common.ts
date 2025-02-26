import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import { RspackManifestPlugin } from "rspack-manifest-plugin";
import WebpackDotenvPlugin from "dotenv-webpack";
import path from "path";

import rules from "./rspack.rules";

import { version, description, displayName } from "../package.json";

const srcDir = path.resolve(__dirname, "..", "src");

export default defineConfig({
  entry: {
    index: path.resolve(srcDir, "index"),
    background: path.resolve(srcDir, "scripts", "background"),
    authcheck: path.resolve(srcDir, "scripts", "authcheck"),
  },
  output: { filename: "[name].[contenthash].js" },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".html", ".wasm", ".svg"],
  },
  experiments: { css: true },
  module: { rules },
  plugins: [
    new rspack.ProgressPlugin(),
    new rspack.HtmlRspackPlugin({
      template: "./src/index.html",
      minify: true,
      inject: true,
      chunks: ["index"],
    }),
    new WebpackDotenvPlugin({ path: path.resolve(__dirname, "..", ".env") }),
    new RspackManifestPlugin({
      generate: (_seed, files) => {
        const baseManifest = {
          manifest_version: 2,
          version,
          description,
          name: displayName,
          browser_action: {
            default_popup: "index.html",
            default_title: "See who is live",
          },
          background: { scripts: ["BACKGROUND_SCRIPT"] },
          icons: {
            "16": "icons/16.png",
            "32": "icons/32.png",
            "48": "icons/48.png",
            "64": "icons/64.png",
            "96": "icons/96.png",
            "128": "icons/128.png",
            "256": "icons/256.png",
          },
          permissions: ["storage", "alarms", "*://*.twitch.tv/*"],
          content_scripts: [
            {
              matches: ["*://nowlive.jewelexx.com/auth/callback"],
              js: ["CONTENT_SCRIPT"],
            },
          ],
        };

        const backgroundJs = files.find(({ name }) => name === "background.js");
        const authcheckJs = files.find(({ name }) => name === "authcheck.js");

        if (!backgroundJs) {
          throw new Error("background.js not found");
        }

        if (!authcheckJs) {
          throw new Error("authcheck.js not found");
        }

        baseManifest.background.scripts = [
          backgroundJs.path.replace("auto/", ""),
        ];
        baseManifest.content_scripts[0].js = [
          authcheckJs.path.replace("auto/", ""),
        ];

        return { ...baseManifest };
      },
    }),
  ],
});
