// lib
import * as React from "react";

// components
import { Block } from "baseui/block";

// styles
import {
  headerBarLeftWrapper,
  headerBarBackIcon,
  headerBarText,
  headerBar,
} from "../styles/navStyles";
import { signOutButton } from "../styles/listStyles";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface Props {
  headerText: string; // text to render in the header
}

/**
 * React component to render the HeaderText on the top of the fixed navigation bar
 */
export const HeaderBarContents: React.FC<Props> = React.memo(
  ({ headerText }) => {
    return (
      <Block {...headerBar}>
        <Block {...headerBarLeftWrapper}>
          <Block {...headerBarBackIcon}>
            <Image width="32px" height="32px" src="/backArrow.png"></Image>
          </Block>
          <Block {...headerBarText} className="header">
            {headerText}
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
  }
);
