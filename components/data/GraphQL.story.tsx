import { ComponentStory, ComponentMeta } from "@storybook/react";

import Component from "./GraphQL";

export default {
  parameters: {
    layout: "fullscreen",
    options: { showPanel: false },
  },
} as ComponentMeta<typeof Component>;

export const GraphQL: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);
