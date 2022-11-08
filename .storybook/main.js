const path = require("path");
const styledConfig = require(path.join(__dirname, "../styled.config.js"));
const ReactDocgenTypescriptPlugin =
  require("react-docgen-typescript-plugin").default;

module.exports = {
  stories: ["../components/**/*.story.@(js|jsx|ts|tsx|mdx)"],
  babel: {
    plugins: [
      ["babel-plugin-styled-components", styledConfig],
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      // ["@babel/plugin-syntax-decorators", { legacy: true }],
    ],
  },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-designs",
    {
      name: "storybook-addon-next",
      options: {
        nextConfigPath: path.resolve(__dirname, "../next.config.js"),
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  plugins: [new ReactDocgenTypescriptPlugin()],
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};
