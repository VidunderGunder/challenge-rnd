import { Center, CenterProps, Stack, Title } from "@mantine/core";
import FullHeightCenter from "components/general/FullHeightCenter";
import Image from "next/image";
import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = {
  // Component props here
} & Partial<ComponentPropsWithoutRef<"div"> & CenterProps>;

export default forwardRef<HTMLDivElement, Props>(function Component(
  { children, ...props },
  ref
) {
  return (
    <FullHeightCenter ref={ref} {...props}>
      <Stack>
        <Center>
          <Image
            src="/favicon.ico"
            alt="Your favicon"
            width={128}
            height={128}
          />
        </Center>
        <Title align="center">Oh</Title>
      </Stack>
      {children}
    </FullHeightCenter>
  );
});
