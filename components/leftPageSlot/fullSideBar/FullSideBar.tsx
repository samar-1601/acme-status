// lib
import { useState } from "react";
import * as React from "react";
import { signOut, useSession } from "next-auth/react";

// components
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import Router from "next/router";
import { FullSideBarMenuItem } from "./FullSideBarMenuItem";
import WelcomePage from "../../welcomePage/WelcomePage";
import Image from "next/image";
import { FaSignOutAlt } from "react-icons/fa";

// constants
import { SideBarMenu } from "../../../constants";

// styles
import {
  sideBarHeaderName,
  sideBarStyle,
  signOutButton,
  userDetailsWrapper,
  userImageWrapper,
  userNameWrapper,
  emailWrapper,
  sideBarCollapseIcon,
  sideBarHeaderWrapper,
} from "./overrides/sideBarStyles";
import { hasListLoadedStyle } from "../../incidents/list/overrides/listStyles";
import { AiOutlineLeft } from "react-icons/ai";
import { headerBarBackIcon } from "../../components/overrides/componentListStyles";

interface Props {
  /**
   * the active/selected item currently on the sidebar
   */
  activeItemID: SideBarMenu;
  // isOpen: boolean;
  handleIsOpenChange: Function;
}

/**
 * SideBar component
 * @returns sidebar react component for the app
 */
const FullSideBar: React.FC<Props> = React.memo(
  ({ activeItemID, handleIsOpenChange }) => {
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
        <Block {...sideBarHeaderWrapper}>
          <Block {...sideBarHeaderName} onClick={() => Router.push("/")}>
            {/* <Image src="/Status_icon.png" height={40} width={50}></Image> */}
            Acme
          </Block>
          <Block {...sideBarCollapseIcon} onClick={() => handleIsOpenChange()}>
            <AiOutlineLeft size={26} />
          </Block>
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
          <Block {...userNameWrapper}>
            {session.user?.name ?? "User Name"}
          </Block>
          <Block {...emailWrapper}>{session.user?.email ?? "User Email"}</Block>
        </Block>
        <Block>
          <Block>
            <FullSideBarMenuItem
              onClick={() => {
                setActiveMenuItem(SideBarMenu.IncidentsView);
                Router.push("/incidents");
              }}
              menuItem={SideBarMenu.IncidentsView}
              activeMenuItem={activeMenuItem}
            />
            <FullSideBarMenuItem
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
              <FullSideBarMenuItem
                menuItem={SideBarMenu.ClientsPage}
                activeMenuItem={activeMenuItem}
              />
            </a>
          </Block>
        </Block>
        <Block
          onClick={() => {
            // signOut of the page and also remove the loadingcount for the homepage (used for showing the successfully logged in SnackBar when signed in for the first time)
            localStorage.removeItem("loadingCount");
            signOut();
          }}
          {...signOutButton}
        >
          <FaSignOutAlt color="black" />
          Sign Out
        </Block>
      </Block>
    );
  }
);

export default FullSideBar;
