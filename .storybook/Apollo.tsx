import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Story } from "@storybook/react";

const client = new ApolloClient({
  uri: process.env.API_URL + "/graphql",
  cache: new InMemoryCache(),
});

export function apolloDecorator(Story: Story) {
  return (
    <ApolloProvider client={client}>
      <Story />
    </ApolloProvider>
  );
}
