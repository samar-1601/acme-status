// lib
import { useState } from "react";
import * as React from "react";
import { signOut, useSession } from "next-auth/react";

// components
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import Router from "next/router";
import { SideBarMenuItem } from "./SideBarMenuItem";
import WelcomePage from "../WelcomePage/WelcomePage";
import Image from "next/image";

// constants
import { SideBarMenu } from "../../constants";

// styles
import {
  sideBarHeaderName,
  sideBarStyle,
  signOutButton,
  userDetailsWrapper,
  userImageWrapper,
  userNameWrapper,
  emailWrapper,
} from "./SideBarStyles";
import { hasListLoadedStyle } from "../incidents/incidents-list-view/styles/listStyles";

interface Props {
  /**
   * the active/selected item currently on the sidebar
   */
  activeItemID: SideBarMenu;
}

/**
 * SideBar component
 * @returns sidebar react component for the app
 */
const SideBar: React.FC<Props> = React.memo(({ activeItemID }) => {
  // state stroing the currently selected sidebar menu-item
  const [activeMenuItem, setActiveMenuItem] =
    useState<SideBarMenu>(activeItemID);

  const { data: session, status } = useSession(); // get user's session details

  // if status not confirmed
  if (status === "loading") {
    return (
      <Block {...hasListLoadedStyle}>
        <Spinner />
      </Block>
    );
  }

  // is user not logged in redirect to welcome page
  if (!session) return <WelcomePage />;

  return (
    <Block {...sideBarStyle}>
      <Block {...sideBarHeaderName} onClick={() => Router.push("/")}>
        {/* <Image src="/Status_icon.png" height={40} width={50}></Image> */}
        Acme
      </Block>
      <Block {...userDetailsWrapper}>
        <Block {...userImageWrapper}>
          <Image
            alt="User Image"
            src={session?.user?.image ?? "/blankProfileImage.png"}
            height={100}
            width={100}
            className="userProfileImage"
          ></Image>
        </Block>
        <Block {...userNameWrapper}>{session.user?.name ?? "User Name"}</Block>
        <Block {...emailWrapper}>{session.user?.email ?? "User Name"}</Block>
      </Block>
      <Block>
        <Block>
          <SideBarMenuItem
            onClick={() => {
              setActiveMenuItem(SideBarMenu.IncidentsView);
              Router.push("/incidents");
            }}
            menuItem={SideBarMenu.IncidentsView}
            activeMenuItem={activeMenuItem}
          />
          <SideBarMenuItem
            onClick={() => {
              setActiveMenuItem(SideBarMenu.Components);
              Router.push("/component");
            }}
            menuItem={SideBarMenu.Components}
            activeMenuItem={activeMenuItem}
          />
          <a
            href="https://client-incident-list-view.netlify.app/"
            target="_blank"
          >
            <SideBarMenuItem
              menuItem={SideBarMenu.ClientsPage}
              activeMenuItem={activeMenuItem}
            />
          </a>
        </Block>
      </Block>
      <Block
        className="secondary-button"
        onClick={() => {
          // signOut of the page and also remove the loadingcount for the homepage (used for showing the successfully logged in SnackBar when signed in for the first time)
          localStorage.removeItem("loadingCount");
          signOut();
        }}
        {...signOutButton}
      >
        Sign Out
      </Block>
    </Block>
  );
});

export default SideBar;
