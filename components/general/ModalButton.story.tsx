import { ComponentStory, ComponentMeta } from "@storybook/react";

import Component from "./ModalButton";
type ComponentType = typeof Component;

const meta: ComponentMeta<ComponentType> = {
  parameters: {
    options: {
      showPanel: false,
    },
  },
};

export default meta;

const Template: ComponentStory<ComponentType> = (args) => (
  <Component {...args} />
);

export const ModalButton = Template.bind({});
ModalButton.args = {
  children: "Open modal",
  modalChildren: "Modal content",
  modalProps: {
    title: "Modal title",
    centered: true,
  },
};
