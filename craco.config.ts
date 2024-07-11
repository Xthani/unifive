import * as path from "path";

module.exports = ({ env }: any) => {
  const isProduction: boolean = env === "production";

  return {
    mode: env,
    typescript: {
      enableTypeChecking: true,
    },
    devServer: {
      port: 3001,
    },
    webpack: {
      configure: (webpackConfig: any, { env }: any) => {
        return {
          ...webpackConfig,
          devtool: isProduction ? false : "eval-source-map",
          output: {
            ...webpackConfig.output,
            publicPath: process.env.REACT_APP_ORIGIN_HOST,
          },
          resolve: {
            alias: {
              src: path.join(__dirname, "/src"),
              "@components": path.join(__dirname, "/src/components"),
              "@containers": path.join(__dirname, "/src/containers"),
              "@utils": path.join(__dirname, "/src/utils"),
              "@pages": path.join(__dirname, "/src/pages"),
              "@assets": path.join(__dirname, "/src/assets"),
              "@shared": path.join(__dirname, "/src/shared"),
              "@src": path.join(__dirname, "/src"),
            },
            extensions: [".js", ".jsx", ".tsx", ".ts"],
          },
          plugins: [
            ...webpackConfig.plugins,

          ],
        };
      },
    },
  };
};
