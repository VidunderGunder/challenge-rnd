import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Box, Center, CenterProps } from "@mantine/core";
import { css } from "styled-components";

type Props = {
  // Component props here
} & Partial<ComponentPropsWithoutRef<"div"> & CenterProps>;

export default forwardRef<HTMLDivElement, Props>(function FullHeightCenter(
  { children, ...props },
  ref
) {
  // Your logic
  return (
    <Center
      css={css`
        height: 100%;
      `}
      ref={ref}
      {...props}
    >
      <Box>{children}</Box>
    </Center>
  );
});
