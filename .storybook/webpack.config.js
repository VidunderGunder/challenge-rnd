const { NormalModuleReplacementPlugin } = require("webpack");

module.exports = async ({ config, mode }) => {
  config.plugins.push(
    new NormalModuleReplacementPlugin(/type-graphql$/, (resource) => {
      resource.request = resource.request.replace(
        /type-graphql/,
        "../browser-shim.ts"
      );
    })
  );
  return config;
};
