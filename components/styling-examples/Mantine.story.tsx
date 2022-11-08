import { ComponentStory, ComponentMeta } from "@storybook/react";

import Component from "./Mantine";

export default {
  args: {
    color: "pink",
  },
} as ComponentMeta<typeof Component>;

export const Mantine: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);
