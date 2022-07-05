import { Block } from "baseui/block";
import React from "react";
import { IoMdRefresh } from "react-icons/io";
import { REFRESH_BUTTON_OVERRIDES } from "../../overrides/navStyles";

interface Props {
  setRefreshPressed: Function;
}
export const RefreshButton: React.FC<Props> = React.memo(
  ({ setRefreshPressed }) => {
    return (
      <Block
        overrides={REFRESH_BUTTON_OVERRIDES}
        onClick={() => setRefreshPressed(true)}
      >
        <IoMdRefresh size={22} />
      </Block>
    );
  }
);
