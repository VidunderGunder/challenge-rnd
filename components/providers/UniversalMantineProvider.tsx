import { MantineProvider } from "@mantine/core";
import React, { ComponentPropsWithoutRef } from "react";

export const mantineProviderProps: Omit<
  ComponentPropsWithoutRef<typeof MantineProvider>,
  "children"
> = {
  withCSSVariables: false,
  withGlobalStyles: true,
  withNormalizeCSS: false,
  theme: {
    colorScheme: "light",
  },
};

export function UniversalMantineProvider({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof MantineProvider>) {
  return (
    <MantineProvider {...mantineProviderProps} {...props}>
      {children}
    </MantineProvider>
  );
}
