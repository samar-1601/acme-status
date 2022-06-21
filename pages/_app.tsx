import React from "react";
import App from "next/app";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { styletron } from "../styletron";
import { SessionProvider } from "next-auth/react";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <SessionProvider session={pageProps.session}>
        <StyletronProvider value={styletron}>
          <BaseProvider theme={LightTheme}>
            <Component {...pageProps} />
          </BaseProvider>
        </StyletronProvider>
      </SessionProvider>
    );
  }
}
