// lib
import * as React from "react";

// components
import { Block } from "baseui/block";

// styles
import { HEADER_BAR_OVERRIDES } from "../../overrides/navStyles";
import { PageType } from "../../../../../constants";
import { HeaderBarText } from "./HeaderBarText";
import { SearchBar } from "./SearchBar";
import { RefreshButton } from "./RefreshButton";

interface Props {
  headerText: string; // text to render in the header
  onSubmit: Function;
  activePage: PageType;
  setRefreshPressed: Function;
  isRefreshPressed: boolean;
}

/**
 * React component to render the Header components on the top of the fixed navigation bar
 */
export const HeaderBarContents: React.FC<Props> = React.memo(
  ({
    headerText,
    onSubmit,
    activePage,
    setRefreshPressed,
    isRefreshPressed,
  }) => {
    return (
      <Block overrides={HEADER_BAR_OVERRIDES}>
        <HeaderBarText headerText={headerText} />
        <SearchBar activePage={activePage} onSubmit={onSubmit} />
        <RefreshButton
          setRefreshPressed={setRefreshPressed}
          isRefreshPressed={isRefreshPressed}
        />
      </Block>
    );
  }
);
