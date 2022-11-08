import { ComponentStory, ComponentMeta } from "@storybook/react";

import Component from "./CRUD";

export default {
  parameters: {
    layout: "fullscreen",
    options: { showPanel: false },
  },
} as ComponentMeta<typeof Component>;

export const CRUD: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);
