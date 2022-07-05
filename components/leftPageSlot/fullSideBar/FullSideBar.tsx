// lib
import * as React from "react";
import { signOut, useSession } from "next-auth/react";

// components
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import WelcomePage from "../../welcomePage/WelcomePage";
import { FaSignOutAlt } from "react-icons/fa";

// constants
import { SideBarMenu } from "../../../constants";

// styles
import {
  SIDE_BAR_STYLE_OVERRIDES,
  SIGN_OUT_BUTTON_OVERRIDES,
  SIDE_BAR_COLLAPSE_ICON_OVERRIDES,
} from "./overrides/sideBarStyles";
import { LOADER_OVERRIDES } from "../../incidents/list/overrides/listStyles";
import { AiOutlineLeft } from "react-icons/ai";
import { FullSideBarMenuList } from "./FullSideBarMenuList";
import { FullSideBarDetails } from "./FullSideBarDeatils";

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
        <FullSideBarDetails
          userEmail={session.user?.email ?? "User Email"}
          userImageSRC={session?.user?.image ?? "/blankProfileImage.png"}
          userName={session.user?.name ?? "User Name"}
        />
        <FullSideBarMenuList activeItemID={activeItemID} />
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
        <Block
          overrides={SIDE_BAR_COLLAPSE_ICON_OVERRIDES}
          onClick={() => handleIsOpenChange()}
        >
          <AiOutlineLeft size={16} />
        </Block>
      </Block>
    );
  }
);

export default FullSideBar;
