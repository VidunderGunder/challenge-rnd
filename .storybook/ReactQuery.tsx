import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Story } from "@storybook/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export default function reactQueryDecorator(Story: Story) {
  return (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  );
}
