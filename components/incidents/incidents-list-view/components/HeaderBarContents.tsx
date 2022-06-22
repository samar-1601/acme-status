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
import { Avatar } from "baseui/avatar";

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
<<<<<<< HEAD
          <Block {...headerBarBackIcon} className="material-symbols-outlined">
            arrow_back
          </Block>
          <Block {...headerBarText}>
            <h1 className="header">{headerText}</h1>
          </Block>
=======
            <Block {...headerBarBackIcon}>
            <Avatar name={"backButton"} src="/backArrow.png"></Avatar>
            </Block>
          <Block {...headerBarText}>{headerText}</Block>
>>>>>>> fdacdf315b3d182c1fed225e9194fe4f836512b6
        </Block>
        <Block
          className="secondary-button"
          onClick={() => signOut()}
          {...signOutButton}
        >
          Sign Out
        </Block>
      </Block>
    );
  }
);
