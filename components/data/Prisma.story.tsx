import { ComponentStory, ComponentMeta } from "@storybook/react";

import Component from "./Prisma";

export default {
  parameters: {
    layout: "fullscreen",
    options: { showPanel: false },
  },
} as ComponentMeta<typeof Component>;

export const Prisma: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);
