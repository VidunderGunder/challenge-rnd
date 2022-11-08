import { ComponentPropsWithoutRef, forwardRef } from "react";
import { CenterProps } from "@mantine/core";
import CenteredBox from "./general/FullHeightCenter";

type Props = {
  // Component props here
} & Omit<ComponentPropsWithoutRef<"div"> & CenterProps, "children">;

export default forwardRef<HTMLDivElement, Props>(function SinglePageApp(
  { ...props },
  ref
) {
  // Your logic
  return (
    <CenteredBox {...props}>
      Your Single Page Application here. <br />
      For multiple pages, look into how{" "}
      <a href="https://nextjs.org/learn/foundations/about-nextjs?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=next-website">
        Next.js
      </a>{" "}
      works.
    </CenteredBox>
  );
});
