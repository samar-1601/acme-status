// lib
import { useState } from "react";
import * as React from "react";
import { signOut, useSession } from "next-auth/react";

// components
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import Router from "next/router";
import { CollapsedSideBarMenuItem } from "./CollapsedSideBarMenuItem";
import WelcomePage from "../../welcomePage/WelcomePage";
import Image from "next/image";
import { FaSignOutAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineRight } from "react-icons/ai";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";

// constants
import { SideBarMenu } from "../../../constants";

// styles
import {
  collapsedSideBarHeaderName,
  collapsedSideBarStyle,
  collapsedSignOutButton,
  collapsedUserDetailsWrapper,
  userImageWrapper,
  collapsedEmailWrapper,
  sideBarCollapseIcon,
} from "./overrides/collapsedSideBarStyles";
import { hasListLoadedStyle } from "../../incidents/list/overrides/listStyles";

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
const CollapsedSideBar: React.FC<Props> = React.memo(
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
      <Block {...collapsedSideBarStyle}>
        <Block {...sideBarCollapseIcon} onClick={() => handleIsOpenChange()}>
          <AiOutlineRight size={26} />
        </Block>
        <Block {...collapsedSideBarHeaderName} onClick={() => Router.push("/")}>
          A
        </Block>
        <Block {...collapsedUserDetailsWrapper}>
          <StatefulPopover
            content={session.user?.name ?? "User Name"}
            triggerType={TRIGGER_TYPE.hover}
            overrides={{
              Body: {
                style: {
                  zIndex: 100,
                  padding: "8px",
                },
              },
            }}
          >
            <Block {...userImageWrapper}>
              <Image
                alt="User Image"
                src={session?.user?.image ?? "/blankProfileImage.png"}
                height={48}
                width={48}
                className="userProfileImage"
              ></Image>
            </Block>
          </StatefulPopover>
          <StatefulPopover
            content={session.user?.email ?? "User Email"}
            triggerType={TRIGGER_TYPE.hover}
            overrides={{
              Body: {
                style: {
                  zIndex: 100,
                  padding: "8px",
                },
              },
            }}
          >
            <Block {...collapsedEmailWrapper}>
              <HiOutlineMail size={26} />
            </Block>
          </StatefulPopover>
        </Block>
        <Block>
          <Block>
            <CollapsedSideBarMenuItem
              onClick={() => {
                setActiveMenuItem(SideBarMenu.IncidentsView);
                Router.push("/incidents");
              }}
              menuItem={SideBarMenu.IncidentsView}
              activeMenuItem={activeMenuItem}
            />
            <CollapsedSideBarMenuItem
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
              <CollapsedSideBarMenuItem
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
          {...collapsedSignOutButton}
        >
          <FaSignOutAlt color="black" />
        </Block>
      </Block>
    );
  }
);

export default CollapsedSideBar;
