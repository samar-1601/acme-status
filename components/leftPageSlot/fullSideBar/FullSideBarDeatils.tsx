//lib
import * as React from "react";
import Image from "next/image";
import Router from "next/router";

//components
import { Block } from "baseui/block";

//overrides
import {
  SIDE_BAR_HEADER_WRAPPER_OVERRIDES,
  SIDE_BAR_HEADER_NAME_OVERRIDES,
  USER_DETAILS_WRAPPER_OVERRIDES,
  USER_NAME_WRAPPER_OVERRIDES,
  EMAIL_WRAPPER_OVERRIDES,
} from "./overrides/sideBarStyles";

interface Props {
  userName: string;
  userEmail: string;
  userImageSRC: string;
}

export const FullSideBarDetails: React.FC<Props> = React.memo(
  ({ userEmail, userImageSRC, userName }) => {
    return (
      <>
        <Block overrides={SIDE_BAR_HEADER_WRAPPER_OVERRIDES}>
          <Block
            overrides={SIDE_BAR_HEADER_NAME_OVERRIDES}
            onClick={() => Router.push("/")}
          >
            Acme
          </Block>
        </Block>
        <Block overrides={USER_DETAILS_WRAPPER_OVERRIDES}>
          <Block>
            <Image
              alt="User Image"
              src={userImageSRC}
              height={100}
              width={100}
              className="userProfileImage"
            ></Image>
          </Block>
          <Block overrides={USER_NAME_WRAPPER_OVERRIDES}>{userName} </Block>
          <Block overrides={EMAIL_WRAPPER_OVERRIDES}>{userEmail} </Block>
        </Block>
      </>
    );
  }
);
