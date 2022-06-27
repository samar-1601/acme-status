import { Block } from "baseui/block";
import * as React from "react";
import { headerBar, headerBarLeftWrapper, headerBarText } from "../incidents/incidents-list-view/styles/navStyles";
import { headerBarBackIcon } from "./componentStyles";
import Image from "next/image";

interface Props {
  headerText: string; // text to render in the header
}
export const Header: React.FC<Props> = React.memo(
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
      </Block>
    );
  }
);