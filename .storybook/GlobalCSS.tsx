import React from "react";
import { Story } from "@storybook/react";
import { GlobalCSS } from "../styles/styles";

export const globalCSSDecorator = (Story: Story) => {
  return (
    <>
      <GlobalCSS />
      <Story />
    </>
  );
};
