import { Center, Paper, Text } from "@mantine/core";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TbArrowDown } from "react-icons/tb";
import { css } from "styled-components";

import Component from "./ScrollTrigger";
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
  <div
    css={css`
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    `}
  >
    <div>
      <Center>
        <Text>Scroll Down to Demo</Text>
      </Center>
      <Center
        css={css`
          /* Scroll animation */
          animation: scroll-down 1.25s ease-in-out infinite;
          @keyframes scroll-down {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(0.5em);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
      >
        <TbArrowDown />
      </Center>
    </div>
    <Component {...args}>Trigger</Component>
  </div>
);

export const ScrollTrigger = Template.bind({});
ScrollTrigger.args = {
  onTrigger: () => alert("Triggered"),
};
