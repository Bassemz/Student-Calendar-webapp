import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "../app/store";
import { Provider } from "react-redux";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Head>
          <title>OnTime Student Calendar</title>
          <meta name="description" content="No more time wasting!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
