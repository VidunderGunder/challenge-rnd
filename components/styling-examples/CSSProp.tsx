import { css } from "styled-components";
import { exampleColor, ExampleProps } from "./example";

export default function CSSPropComponent({
  color = exampleColor,
}: ExampleProps) {
  return (
    <div
      css={css`
        color: ${color};
        padding: 0.25em 2em;
        width: max-content;
        box-shadow: 0 0.1em 0.3em -0.1em rgba(0, 0, 0, 0.5);
        border-radius: 0.5em;
        font-family: "Roboto", sans-serif;
      `}
    >
      <h1>CSS-prop</h1>
    </div>
  );
}
