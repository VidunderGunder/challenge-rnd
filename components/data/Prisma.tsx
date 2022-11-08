import { ComponentPropsWithoutRef } from "react";
import { fullscreenIFrameCSS } from "styles/styles";

export default function EmbeddedSandbox(
  props: ComponentPropsWithoutRef<"iframe">
) {
  return (
    <iframe src="http://localhost:5555" css={fullscreenIFrameCSS} {...props} />
  );
}
