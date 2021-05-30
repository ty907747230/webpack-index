module.exports = {
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
};
