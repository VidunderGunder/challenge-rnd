import React from "react";
import { MantineProvider } from "@mantine/core";
import { Story } from "@storybook/react";
import { mantineProviderProps } from "../components/providers/UniversalMantineProvider";
import { NotificationsProvider } from "@mantine/notifications";

export const mantineDecorator = (Story: Story) => {
  return (
    <MantineProvider {...mantineProviderProps}>
      <NotificationsProvider>
        <Story />
      </NotificationsProvider>
    </MantineProvider>
  );
};
