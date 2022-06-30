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
  COLLAPSED_SIDE_BAR_HEADER_NAME_OVERRIDES,
  COLLAPSED_SIDE_BAR_OVERRIDES,
  COLLAPSED_SIGN_OUT_BUTTON_OVERRIDES,
  COLLAPSED_USER_DETAILS_WRAPPER_OVERRIDES,
  COLLAPSED_EMAIL_WRAPPER_OVERRIDES,
  COLLAPSED_SIDE_BAR_HOVER_OVERRIDES,
  SIDE_BAR_COLLAPSE_ICON_OVERRIDES,
} from "./overrides/collapsedSideBarStyles";
import { LOADER_OVERRIDES } from "../../incidents/list/overrides/listStyles";
import { CollapsedSideBarDetails } from "./CollapsedSideBarDetails";
import { CollapsedSideBarMenuList } from "./CollapseSideBarMenuList";

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
      <Block overrides={COLLAPSED_SIDE_BAR_OVERRIDES}>
        <CollapsedSideBarDetails
          userEmail={session.user?.email ?? "User Email"}
          userImageSRC={session?.user?.image ?? "/blankProfileImage.png"}
          userName={session.user?.name ?? "User Name"}
          handleIsOpenChange={handleIsOpenChange}
        />
        <Block>
          <CollapsedSideBarMenuList activeItemID={activeItemID} />
        </Block>
        <StatefulPopover
          content={
            <Block overrides={SIDE_BAR_COLLAPSE_ICON_OVERRIDES}>Sign Out</Block>
          }
          triggerType={TRIGGER_TYPE.hover}
          overrides={{
            Body: {
              style: {
                zIndex: 100,
              },
            },
          }}
        >
          <Block
            onClick={() => {
              // signOut of the page and also remove the loadingcount for the homepage (used for showing the successfully logged in SnackBar when signed in for the first time)
              localStorage.removeItem("loadingCount");
              localStorage.removeItem("isSideBarOpen");
              signOut();
            }}
            overrides={COLLAPSED_SIGN_OUT_BUTTON_OVERRIDES}
          >
            <FaSignOutAlt color="black" />
          </Block>
        </StatefulPopover>
      </Block>
    );
  }
);

export default CollapsedSideBar;
