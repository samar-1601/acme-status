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
  SIDE_BAR_HEADER_NAME_OVERRIDES,
  SIDE_BAR_STYLE_OVERRIDES,
  SIGN_OUT_BUTTON_OVERRIDES,
  USER_DETAILS_WRAPPER_OVERRIDES,
  USER_NAME_WRAPPER_OVERRIDES,
  EMAIL_WRAPPER_OVERRIDES,
  SIDE_BAR_COLLAPSE_ICON_OVERRIDES,
  SIDE_BAR_HEADER_WRAPPER_OVERRIDES,
} from "./overrides/sideBarStyles";
import { LOADER_OVERRIDES } from "../../incidents/list/overrides/listStyles";
import { AiOutlineLeft } from "react-icons/ai";

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
        <Block overrides={LOADER_OVERRIDES}>
          <Spinner />
        </Block>
      );
    }

    // is user not logged in redirect to welcome page
    if (!session) return <WelcomePage />;

    return (
      <Block overrides={SIDE_BAR_STYLE_OVERRIDES}>
        <Block overrides={SIDE_BAR_HEADER_WRAPPER_OVERRIDES}>
          <Block
            overrides={SIDE_BAR_HEADER_NAME_OVERRIDES}
            onClick={() => Router.push("/")}
          >
            {/* <Image src="/Status_icon.png" height={40} width={50}></Image> */}
            Acme
          </Block>
          <Block
            overrides={SIDE_BAR_COLLAPSE_ICON_OVERRIDES}
            onClick={() => handleIsOpenChange()}
          >
            <AiOutlineLeft size={26} />
          </Block>
        </Block>
        <Block overrides={USER_DETAILS_WRAPPER_OVERRIDES}>
          <Block>
            <Image
              alt="User Image"
              src={session?.user?.image ?? "/blankProfileImage.png"}
              height={100}
              width={100}
              className="userProfileImage"
            ></Image>
          </Block>
          <Block overrides={USER_NAME_WRAPPER_OVERRIDES}>
            {session.user?.name ?? "User Name"}
          </Block>
          <Block overrides={EMAIL_WRAPPER_OVERRIDES}>
            {session.user?.email ?? "User Email"}
          </Block>
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
            localStorage.removeItem("isSideBarOpen");
            signOut();
          }}
          overrides={SIGN_OUT_BUTTON_OVERRIDES}
        >
          <FaSignOutAlt color="black" />
          Sign Out
        </Block>
      </Block>
    );
  }
);

export default FullSideBar;
