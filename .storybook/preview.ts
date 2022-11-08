import { globalCSSDecorator } from "./GlobalCSS";
import { mantineDecorator } from "./Mantine";
import reactQueryDecorator from "./ReactQuery";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    isCodeExpanded: true,
  },
  layout: "centered",
  options: {
    showPanel: true,
  },
};

export const decorators = [
  globalCSSDecorator,
  mantineDecorator,
  reactQueryDecorator,
];
