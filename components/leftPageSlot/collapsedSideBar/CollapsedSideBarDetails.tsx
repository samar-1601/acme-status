import { Block } from "baseui/block";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";
import Router from "next/router";
import Image from "next/image";
import { AiOutlineRight } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import {
  SIDE_BAR_COLLAPSE_ICON_OVERRIDES,
  COLLAPSED_SIDE_BAR_HEADER_NAME_OVERRIDES,
  COLLAPSED_USER_DETAILS_WRAPPER_OVERRIDES,
  COLLAPSED_SIDE_BAR_HOVER_OVERRIDES,
  COLLAPSED_EMAIL_WRAPPER_OVERRIDES,
} from "./overrides/collapsedSideBarStyles";
import * as React from "react";

interface Props {
  handleIsOpenChange: Function;
  userName: string;
  userEmail: string;
  userImageSRC: string;
}

export const CollapsedSideBarDetails: React.FC<Props> = React.memo(
  ({ handleIsOpenChange, userName, userEmail, userImageSRC }) => {
    return (
      <>
        <Block
          overrides={COLLAPSED_SIDE_BAR_HEADER_NAME_OVERRIDES}
          onClick={() => Router.push("/")}
        >
          A
        </Block>
        <Block overrides={COLLAPSED_USER_DETAILS_WRAPPER_OVERRIDES}>
          <StatefulPopover
            content={
              <Block overrides={COLLAPSED_SIDE_BAR_HOVER_OVERRIDES}>
                {userName}
              </Block>
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
            <Block>
              <Image
                alt="User Image"
                src={userImageSRC}
                height={48}
                width={48}
                className="userProfileImage"
              ></Image>
            </Block>
          </StatefulPopover>
          <StatefulPopover
            content={
              <Block overrides={COLLAPSED_SIDE_BAR_HOVER_OVERRIDES}>
                {userEmail}
              </Block>
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
            <Block overrides={COLLAPSED_EMAIL_WRAPPER_OVERRIDES}>
              <HiOutlineMail size={26} />
            </Block>
          </StatefulPopover>
        </Block>
      </>
    );
  }
);
