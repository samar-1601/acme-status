// lib
import * as React from "react";

// components
import Head from "next/head";
import Image from "next/image";
import { Block } from "baseui/block";
import { signIn } from "next-auth/react";

// styles
import {
  CONTENT_BLOCK_OVERRIDES,
  TEXT_OVERRIDES,
  IMAGE_OVERRIDES,
  ROW_CONTENT_OVERRIDES,
  HEADER_OVERRIDES,
  DESCRIPTION_OVERRIDES,
} from "./overrides/welcomePageStyles";
import {
  WELCOME_HEADER_TEXT_OVERRIDES,
  WELCOME_HEADER_BIG_TEXT_OVERRIDES,
  WELCOME_HEADER_MEDIUM_TEXT_OVERRIDES,
  SIGN_IN_BUTTON,
  WELCOME_HEADER_SITE_NAME_OVERRIDES,
  WELCOME_HEADER_SECOND_HALF_OVERRIDES,
  WELCOME_HEADER_WRAPPER,
} from "./overrides/welcomePageStyles";

const WelcomePage: React.FC = React.memo(() => {
  return (
    <>
      <Head>
        <title>statusapp</title>
        <link rel="icon" href="/Status_icon.png" />
      </Head>
      <Block overrides={WELCOME_HEADER_WRAPPER}>
        <Block overrides={WELCOME_HEADER_SITE_NAME_OVERRIDES}>statusapp</Block>
        <Block overrides={WELCOME_HEADER_SECOND_HALF_OVERRIDES}>
          <Block overrides={WELCOME_HEADER_TEXT_OVERRIDES}>
            <Block overrides={WELCOME_HEADER_BIG_TEXT_OVERRIDES}>
              You run your websites <br /> We will handle your tech-management
            </Block>
            <Block overrides={WELCOME_HEADER_MEDIUM_TEXT_OVERRIDES}>
              We build a developer-platforms for company's internal team to
              handle incidents and client-side platforms to keep customers
              informed about the app's status.
            </Block>
            <Block overrides={SIGN_IN_BUTTON} onClick={() => signIn()}>
              Sign In
            </Block>
          </Block>
          <Block>
            <Image src="/headerImage.png" height={300} width={570}></Image>
          </Block>
        </Block>
      </Block>
      <Block overrides={CONTENT_BLOCK_OVERRIDES}>
        <Block overrides={ROW_CONTENT_OVERRIDES}>
          <Block overrides={TEXT_OVERRIDES}>
            <Block overrides={HEADER_OVERRIDES}>Incidents</Block>
            <Block overrides={DESCRIPTION_OVERRIDES}>
              Our app provides the facility to properly manage incidents. We can
              create and update incidents as we wish. Implemented using React
              Virtualized Infinite scrolling with progressive loading.
            </Block>
          </Block>
          <Block overrides={IMAGE_OVERRIDES}>
            <Image
              src="/incidentsView.png"
              className="welcome-page-image"
              height={350}
              width={650}
            />
          </Block>
        </Block>
        <Block overrides={ROW_CONTENT_OVERRIDES}>
          <Block overrides={TEXT_OVERRIDES}>
            <Block overrides={HEADER_OVERRIDES}>Components</Block>
            <Block overrides={DESCRIPTION_OVERRIDES}>
              We can update status of components in incident. Also provided
              facility for creating incidents and changing status of incidents
              and components.
            </Block>
          </Block>
          <Block overrides={IMAGE_OVERRIDES}>
            <Image
              src="/components.png"
              className="welcome-page-image"
              height={350}
              width={650}
            />
          </Block>
        </Block>
        <Block overrides={ROW_CONTENT_OVERRIDES}>
          <Block overrides={TEXT_OVERRIDES}>
            <Block overrides={HEADER_OVERRIDES}>Client Side view</Block>
            <Block overrides={DESCRIPTION_OVERRIDES}>
              We provide a client side view of incidents where users will be
              able to see the current status of incidents and also uptime of
              components.
            </Block>
          </Block>
          <Block overrides={IMAGE_OVERRIDES}>
            <Image
              src="/components.png"
              className="welcome-page-image"
              height={350}
              width={650}
            />
          </Block>
        </Block>
      </Block>
    </>
  );
});

export default WelcomePage;
