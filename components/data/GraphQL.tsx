import { ApolloSandbox } from "@apollo/sandbox/react";
import { ComponentPropsWithoutRef } from "react";
import { css } from "styled-components";

export default function EmbeddedSandbox(
  props: ComponentPropsWithoutRef<typeof ApolloSandbox>
) {
  return (
    <div {...props}>
      <ApolloSandbox
        initialEndpoint={process.env.API_URL + "/graphql"}
        includeCookies={false}
        css={css`
          height: 100vh;
          max-height: 100%;
        `}
      />
    </div>
  );
}
