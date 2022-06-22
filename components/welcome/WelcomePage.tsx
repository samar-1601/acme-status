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
} from "./welcomePageStyles";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { text } from "stream/consumers";

{
  /* <Block {...loginListItem} onClick={() => signIn()}> */
}
const WelcomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Status App</title>
        <link rel="icon" href="/Status_icon.png" />
      </Head>
      <Block {...contentBlock}>
        {/*souvik*/}
        <Block
          {...rowContent}
          overrides={{
            Block: {
              style: { paddingLeft: "100px" },
            },
          }}
        >
          <Block {...textProps}>
            <Block {...headerStyle}>
              <h2 className="header">Incidents</h2>
            </Block>
            <p>
              Our app provides the facility to properly manage incidents. We can
              create and update incidents as we wish. Implemented using React
              Window infinite scrolling.
            </p>
          </Block>
          <Block {...imageProps}>
            <img src="/components.png" />
          </Block>
        </Block>
        <Block
          {...rowContent}
          overrides={{
            Block: {
              style: { flexDirection: "row-reverse", paddingRight: "100px" },
            },
          }}
        >
          <Block {...textProps}>
            <Block {...headerStyle}>
              <h2 className="header">Components</h2>
            </Block>
            <p>
              We can update status of components in incident. Also provided
              facility for creating incidents and changing status of incidents
              and components.
            </p>
          </Block>
          <Block {...imageProps}>
            <img src="/components.png" />
          </Block>
        </Block>
        <Block
          {...rowContent}
          overrides={{
            Block: {
              style: { paddingLeft: "100px" },
            },
          }}
        >
          <Block {...textProps}>
            <Block {...headerStyle}>
              <h2 className="header">Client Side view</h2>
            </Block>
            <p>
              We provide a client side view of incidents where users will be
              able to see the current status of incidents and also uptime of
              components.
            </p>
          </Block>
          <Block {...imageProps}>
            <img src="/components.png" />
          </Block>
        </Block>
      </Block>
    </>
  );
};

export default WelcomePage;
