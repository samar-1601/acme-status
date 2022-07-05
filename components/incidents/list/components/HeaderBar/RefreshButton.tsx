import { Block } from "baseui/block";
import { SIZE, Spinner } from "baseui/spinner";
import React from "react";
import { IoMdRefresh } from "react-icons/io";
import { REFRESH_BUTTON_OVERRIDES } from "../../overrides/navStyles";

interface Props {
  setRefreshPressed: Function;
  isRefreshPressed: boolean;
}
export const RefreshButton: React.FC<Props> = React.memo(
  ({ isRefreshPressed, setRefreshPressed }) => {
    return isRefreshPressed ? (
      <Block overrides={REFRESH_BUTTON_OVERRIDES}>
        <Spinner $size={SIZE.small} $color="#DBDBDB" />
      </Block>
    ) : (
      <Block
        overrides={REFRESH_BUTTON_OVERRIDES}
        onClick={() => setRefreshPressed(true)}
      >
        <IoMdRefresh size={22} />
      </Block>
    );
  }
);
