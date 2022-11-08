import { ComponentStory, ComponentMeta } from "@storybook/react";

import Component from "./CSSProp";
import { exampleColor } from "./example";

export default {
  args: {
    color: exampleColor,
  },
} as ComponentMeta<typeof Component>;

export const CSSProp: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);
