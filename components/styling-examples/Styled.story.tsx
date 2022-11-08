import { ComponentStory, ComponentMeta } from "@storybook/react";
import { exampleColor } from "./example";

import Component from "./Styled";

export default {
  args: {
    color: exampleColor,
  },
} as ComponentMeta<typeof Component>;

export const Styled: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);
