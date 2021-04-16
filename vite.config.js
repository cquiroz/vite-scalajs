import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
import fs from "fs";
// import ts from "@wessberg/rollup-plugin-ts";
// import {cjsToEsm} from "cjstoesm";

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const scalaClassesDir = path.resolve(__dirname, "target/scala-2.13");
  const sjs =
    mode == "production"
      ? path.resolve(scalaClassesDir, "vite-scalajs-opt")
      : path.resolve(scalaClassesDir, "vite-scalajs-fastopt");
  const common = __dirname;
  const webappCommon = path.resolve(common, "src/main/webapp/");
  const imagesCommon = path.resolve(webappCommon, "images");
  const themeConfig = path.resolve(webappCommon, "theme/theme.config");
  const themeSite = path.resolve(webappCommon, "theme");
  const suithemes = path.resolve(webappCommon, "suithemes");
  const publicDirProd = path.resolve(common, "src/main/public");
  const publicDirDev = path.resolve(common, "src/main/publicdev");
  const publicDir = 
    mode == "production"
     ? publicDirProd
     : publicDirDev
  return {
    root: "src/main/webapp",
    publicDir: publicDir,
    resolve: {
      alias: [
        {
          find: "@sjs",
          replacement: sjs,
        },
        {
          find: "/common",
          replacement: webappCommon,
        },
        {
          find: "/images",
          replacement: imagesCommon,
        },
        {
          find: "../../theme.config",
          replacement: themeConfig,
        },
        {
          find: "theme/site",
          replacement: themeSite,
        },
        {
          find: "suithemes",
          replacement: suithemes,
        },
      ],
    },
    server: {
      strictPort: true,
      port: 9090,
      https: {
        key: fs.readFileSync("server.key"),
        cert: fs.readFileSync("server.cert"),
      },
      watch: {
        ignored: [
          function ignoreThisPath(_path) {
            const sjsIgnored =
              _path.includes("/target/stream") ||
              _path.includes("/zinc/") ||
              _path.includes("/classes");
            return sjsIgnored;
          },
        ],
      },
    },
    build: {
      terserOptions: {
        sourceMap: false,
      },
      outDir: path.resolve(__dirname, "static"),
    },
    plugins: [reactRefresh()],
  };
};
