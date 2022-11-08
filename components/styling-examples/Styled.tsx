import styled from "styled-components";
import { exampleColor, ExampleProps } from "./example";

const Div = styled.div<{ color?: string }>`
  color: ${(props) => props.color};
  padding: 0.25em 2em;
  width: max-content;
  box-shadow: 0 0.1em 0.3em -0.1em rgba(0, 0, 0, 0.5);
  border-radius: 0.5em;
  font-family: "Roboto", sans-serif;
`;

const Title = styled.h1`
  color: ${(props) => props.color};
`;

export default function StyledComponent({
  color = exampleColor,
}: ExampleProps) {
  return (
    <Div color={color}>
      <Title>Styled</Title>
    </Div>
  );
}
