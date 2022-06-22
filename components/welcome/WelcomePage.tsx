import { Block } from "baseui/block";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Head from "next/head";
import {
  welcomeHeaderTextWrapper,
  welcomeHeaderBigText,
  welcomeHeaderMediumText,
  signInButton,
  welcomeHeaderSiteName,
  welcomeHeaderSecondHalfStyle,
  welcomeHeaderWrapper,
} from "./welcomePageStyles";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";

const WelcomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Status App</title>
        <link rel="icon" href="/Status_icon.png" />
      </Head>
      <Block {...welcomeHeaderWrapper}>
        {/* samar */}
        <Block {...welcomeHeaderSiteName}>statusapp</Block>
        <Block {...welcomeHeaderSecondHalfStyle}>
          <Block {...welcomeHeaderTextWrapper}>
            <Block {...welcomeHeaderBigText}>
              You run your websites <br /> We will handle your tech-management
            </Block>
            <Block {...welcomeHeaderMediumText}>
              We build a developer-platforms for company's internal team to
              handle incidents and client-side platforms to keep customers
              informed about the app's status.
            </Block>
            <Block {...signInButton} onClick={() => signIn()}>
              SignIn
            </Block>
          </Block>
          <Block>
            <Image src="/headerImage.png" height={300} width={570}></Image>
          </Block>
        </Block>
      </Block>
    </>
  );
};

export default WelcomePage;
