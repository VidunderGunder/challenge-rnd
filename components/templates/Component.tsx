import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = {
  // Custom props here
} & ComponentPropsWithoutRef<"div">;

export default forwardRef<HTMLDivElement, Props>(function Component(
  { children, ...props },
  ref
) {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});
