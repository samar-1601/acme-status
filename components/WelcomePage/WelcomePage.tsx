import { Block } from "baseui/block";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Head from "next/head";
import {
  contentBlock,
  textProps,
  imageProps,
  rowContent,
  headerStyle,
  descriptionContentStyle,
} from "./welcomePageStyles";
import { text } from "stream/consumers";
import {
  welcomeHeaderTextWrapper,
  welcomeHeaderBigText,
  welcomeHeaderMediumText,
  signInButton,
  welcomeHeaderSiteName,
  welcomeHeaderSecondHalfStyle,
  welcomeHeaderWrapper,
} from "./welcomePageStyles";

{
  /* <Block {...loginListItem} onClick={() => signIn()}> */
}
const WelcomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>statusapp</title>
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
      <Block {...contentBlock}>
        {/*souvik*/}
        <Block
          {...rowContent}
          overrides={{
            Block: {
              style: {
                // border: "2px solid black",
                borderRadius: "8px",
              },
              props: { className: "fadingEffect1" },
            },
          }}
        >
          <Block {...textProps}>
            <Block {...headerStyle}>Incidents</Block>
            <Block {...descriptionContentStyle}>
              Our app provides the facility to properly manage incidents. We can
              create and update incidents as we wish. Implemented using React
              Window infinite scrolling.
            </Block>
          </Block>
          <Block {...imageProps}>
            <img src="/incidentsView.png" className="welcome-page-image" />
          </Block>
        </Block>
        <Block
          {...rowContent}
          overrides={{
            Block: {
              style: {
                // border: "2px solid black",
                borderRadius: "8px",
              },
              props: { className: "fadingEffect2" },
            },
          }}
        >
          <Block {...textProps}>
            <Block {...headerStyle}>Components</Block>
            <Block {...descriptionContentStyle}>
              We can update status of components in incident. Also provided
              facility for creating incidents and changing status of incidents
              and components.
            </Block>
          </Block>
          <Block {...imageProps}>
            <img src="/components.png" className="welcome-page-image" />
          </Block>
        </Block>
        <Block
          {...rowContent}
          overrides={{
            Block: {
              style: {
                // border: "2px solid black",
                borderRadius: "8px",
              },
              props: { className: "fadingEffect3" },
            },
          }}
        >
          <Block {...textProps}>
            <Block {...headerStyle}>Client Side view</Block>
            <Block {...descriptionContentStyle}>
              We provide a client side view of incidents where users will be
              able to see the current status of incidents and also uptime of
              components.
            </Block>
          </Block>
          <Block {...imageProps}>
            <img src="/components.png" className="welcome-page-image" />
          </Block>
        </Block>
      </Block>
    </>
  );
};

export default WelcomePage;
