import React from "react";
import App from "next/app";
import "../styles/index.css";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { styletron } from "../styletron";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "baseui/snackbar";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <SessionProvider session={pageProps.session}>
        <StyletronProvider value={styletron}>
          <BaseProvider theme={LightTheme}>
            <SnackbarProvider placement="bottom">
              <Component {...pageProps} />
            </SnackbarProvider>
          </BaseProvider>
        </StyletronProvider>
      </SessionProvider>
    );
  }
}
