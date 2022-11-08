import { Box, Title } from "@mantine/core";
import { exampleColor, ExampleProps } from "./example";

export default function MantineComponent({
  color = exampleColor,
}: ExampleProps) {
  return (
    <Box
      sx={{
        width: "max-content",
        borderRadius: "0.5em",
        boxShadow: "0 0.1em 0.3em -0.1em rgba(0, 0, 0, 0.5)",
      }}
      p="xl"
    >
      <Title color={color}>Mantine</Title>
    </Box>
  );
}
