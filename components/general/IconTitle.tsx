import { Group, ThemeIcon, Title } from "@mantine/core";
import { ComponentPropsWithoutRef, ReactNode } from "react";

export default function IconTitle({
  icon,
  children,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof Group>, "children"> & {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <Group {...props}>
      {icon !== undefined && (
        <ThemeIcon size="lg" variant="light" color="gray">
          {icon}
        </ThemeIcon>
      )}
      <Title order={2}>{children}</Title>
    </Group>
  );
}
