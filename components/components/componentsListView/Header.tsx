import { Block } from "baseui/block";
import * as React from "react";

import { FiArrowLeft } from "react-icons/fi";
import {
  headerBar,
  headerBarBackIcon,
  headerBarLeftWrapper,
} from "../../incidents/list/overrides/navStyles";

interface Props {
  headerText: string; // text to render in the header
}
export const Header: React.FC<Props> = React.memo(({ headerText }) => {
  return (
    <Block {...headerBar}>
      <Block {...headerBarLeftWrapper}>
        <Block {...headerBarBackIcon}>
          <FiArrowLeft size={22} />
        </Block>
        <Block className="header">{headerText}</Block>
      </Block>
    </Block>
  );
});
