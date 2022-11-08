// Name file `babel.config.js` to enable Babel (disables SWC)
// Name file `disabled.babel.config.js` to disable Babel (enables SWC)

const styledConfig = require("./styled.config");

/**
 * @type {import('@babel/core').TransformOptions}
 */
module.exports = {
  presets: ["next/babel"],
  plugins: [
    // [
    //   "babel-plugin-styled-components",
    //   {
    //     cssProp: true,
    //     ssr: true,
    //     meaninglessFileNames: ["index", "styles"],
    //   },
    // ],
    ["babel-plugin-styled-components", styledConfig],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
  ],
};
