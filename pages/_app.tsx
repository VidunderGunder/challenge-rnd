import { AppProps } from "next/app";
import Head from "next/head";
import { GlobalCSS } from "../styles/styles";
import { UniversalMantineProvider } from "components/providers/UniversalMantineProvider";
import "@ionic/react/css/core.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Starter</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <UniversalMantineProvider>
        <Component {...pageProps} />
      </UniversalMantineProvider>
      <GlobalCSS />
    </>
  );
}
