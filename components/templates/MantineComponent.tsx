import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Box, BoxProps } from "@mantine/core";

type Props = {
  // Component props here
} & ComponentPropsWithoutRef<"div"> &
  BoxProps;

export default forwardRef<HTMLDivElement, Props>(function Component(
  { children, ...props },
  ref
) {
  // Logic
  return (
    <Box ref={ref} {...props}>
      {/* 
        Your tags and components here.
        Feel free to wrap it with something else than `<Box />`,
        but remember to adjust types accordingly
      */}
      {children}
    </Box>
  );
});
