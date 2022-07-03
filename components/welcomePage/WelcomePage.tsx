// lib
import * as React from "react";

// components
import Head from "next/head";
import Image from "next/image";
import { Block } from "baseui/block";
import { signIn } from "next-auth/react";
import { BsDiscord, BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";

// styles
import {
  CONTENT_BLOCK_OVERRIDES,
  TEXT_OVERRIDES,
  IMAGE_OVERRIDES,
  ROW_CONTENT_OVERRIDES_EVEN,
  HEADER_OVERRIDES,
  DESCRIPTION_OVERRIDES,
  ROW_CONTENT_OVERRIDES_ODD,
  ROW_CONTENT_LOGIN_OVERRIDES,
  LOGIN_TEXT_OVERRIDES,
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

function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  console.log(reveals);

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 0;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
      reveals[i].classList.remove("reveal");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

const WelcomePage: React.FC = React.memo(() => {
  React.useEffect(() => {
    window.addEventListener("scroll", reveal);
  });

  return (
    <>
      <Head>
        <title>statusapp</title>
        <link rel="icon" href="/Status_icon.png" />
      </Head>
      <Block>
        <Block overrides={WELCOME_HEADER_WRAPPER}>
          <Block overrides={WELCOME_HEADER_SITE_NAME_OVERRIDES}>
            statusapp
          </Block>
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
              <Image src="/landingPage.svg" height={550} width={670}></Image>
            </Block>
          </Block>
        </Block>
        <Block overrides={CONTENT_BLOCK_OVERRIDES}>
          <Block
            overrides={ROW_CONTENT_OVERRIDES_ODD}
            className="startingEffect"
            backgroundColor="lightgrey !important"
          >
            <Block overrides={TEXT_OVERRIDES}>
              <Block overrides={HEADER_OVERRIDES}>Incidents List View</Block>
              <Block overrides={DESCRIPTION_OVERRIDES}>
                Our app provides the facility to properly manage incidents. We
                can create and update incidents as we wish. Implemented using
                React Virtualized Infinite scrolling with progressive loading.
              </Block>
            </Block>
            <Block overrides={IMAGE_OVERRIDES}>
              <Image
                src="/Incidents.png"
                className="welcome-page-image"
                height={350}
                width={570}
              />
            </Block>
          </Block>
          <Block
            overrides={ROW_CONTENT_OVERRIDES_EVEN}
            className="reveal fadingEffect2"
          >
            <Block overrides={IMAGE_OVERRIDES}>
              <Image
                src="/createIncidents.png"
                className="welcome-page-image"
                height={350}
                width={600}
              />
            </Block>
            <Block overrides={TEXT_OVERRIDES}>
              <Block overrides={HEADER_OVERRIDES}>Incident Form</Block>
              <Block overrides={DESCRIPTION_OVERRIDES}>
                Provides facility to add, edit and delete incidents. Allows to
                select which components are affected by the incidents. Also
                changes component status because of incident.
              </Block>
            </Block>
          </Block>
          <Block
            overrides={ROW_CONTENT_OVERRIDES_ODD}
            className="reveal fadingEffect1"
          >
            <Block overrides={TEXT_OVERRIDES}>
              <Block overrides={HEADER_OVERRIDES}>Components</Block>
              <Block overrides={DESCRIPTION_OVERRIDES}>
                We can perform CRUD operations on components. The uptime data of
                each component is available on the component list view.
              </Block>
            </Block>
            <Block overrides={IMAGE_OVERRIDES}>
              <Image
                src="/ComponentsListView.png"
                className="welcome-page-image"
                height={350}
                width={600}
              />
            </Block>
          </Block>
          <Block
            overrides={ROW_CONTENT_OVERRIDES_EVEN}
            className="reveal fadingEffect2"
          >
            <Block overrides={IMAGE_OVERRIDES}>
              <Image
                src="/AddComponent.png"
                className="welcome-page-image"
                height={350}
                width={600}
              />
            </Block>
            <Block overrides={TEXT_OVERRIDES}>
              <Block overrides={HEADER_OVERRIDES}>Component Form</Block>
              <Block overrides={DESCRIPTION_OVERRIDES}>
                The Components Form allows users to add or edit a component. The
                start date of a component can also be altered after checking the
                display uptime checkbox.
              </Block>
            </Block>
          </Block>
          <Block
            overrides={ROW_CONTENT_OVERRIDES_ODD}
            className="reveal fadingEffect1"
          >
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
                src="/AboutThisSite.png"
                className="welcome-page-image"
                height={350}
                width={550}
              />
            </Block>
          </Block>
          <Block overrides={ROW_CONTENT_LOGIN_OVERRIDES}>
            <Block>
              <Image
                src="/loginImage2.svg"
                className="welcome-page-image"
                height={350}
                width={550}
              />
            </Block>
            <Block overrides={LOGIN_TEXT_OVERRIDES}>
              <Block overrides={DESCRIPTION_OVERRIDES}>
                Made with ❤️ by Samar, Souvik and Yash
                <br />
                <Block
                  display="flex"
                  gridGap="20px"
                  padding="10px"
                  marginTop="20px"
                >
                  <BsGoogle size={42} />
                  <a
                    href="https://github.com/samar-1601/acme-status"
                    target="_blank"
                  >
                    <BsGithub size={42} />
                  </a>
                  <BsFacebook size={42} /> <BsDiscord size={42} />
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </>
  );
});

export default WelcomePage;
