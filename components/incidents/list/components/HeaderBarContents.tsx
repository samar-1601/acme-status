// lib
import * as React from "react";
import Router from "next/router";

// components
import { Block } from "baseui/block";
import { FiArrowLeft } from "react-icons/fi";

// styles
import {
  HEADER_BAR_LEFT_WRAPPER_OVERRIDES,
  BACK_ICON_OVERRIDES,
  HEADER_BAR_OVERRIDES,
  SEARCH_HOVER_OVERRIDES,
  SEARCH_WRAPPER_OVERRIDES,
  REFRESH_BUTTON_OVERRIDES,
  SEARCH_OVERRIDES,
  DISABLED_SEARCH_OVERRIDES,
} from "../overrides/navStyles";
import { Input } from "baseui/input";
import { PageType } from "../../../../constants";
import { PLACEMENT, StatefulPopover, TRIGGER_TYPE } from "baseui/popover";
import { IoMdRefresh } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";

interface Props {
  headerText: string; // text to render in the header
  onSubmit: Function;
  activePage: PageType;
  setRefreshPressed: Function;
}

/**
 * React component to render the HeaderText on the top of the fixed navigation bar
 */
export const HeaderBarContents: React.FC<Props> = React.memo(
  ({ headerText, onSubmit, activePage, setRefreshPressed }) => {
    const [inputValue, setInputValue] = React.useState<string>("");
    return (
      <Block overrides={HEADER_BAR_OVERRIDES}>
        <Block overrides={HEADER_BAR_LEFT_WRAPPER_OVERRIDES}>
          <Block
            overrides={BACK_ICON_OVERRIDES}
            onClick={() => {
              Router.push("/");
            }}
          >
            <FiArrowLeft size={22} />
          </Block>
          <Block className="header">{headerText}</Block>
        </Block>
        <Block overrides={SEARCH_WRAPPER_OVERRIDES}>
          {activePage == PageType.All ? (
            <Block>
              <Input
                startEnhancer={<AiOutlineSearch size={20} color="#6B6B6B" />}
                onChange={(e: React.BaseSyntheticEvent) => {
                  setInputValue(e?.target?.value ?? "");
                }}
                placeholder={"Search"}
                overrides={SEARCH_OVERRIDES}
                onKeyDown={(e) => {
                  if (e.code == "Enter") onSubmit(inputValue);
                }}
              />
            </Block>
          ) : (
            <StatefulPopover
              content={
                <Block overrides={SEARCH_HOVER_OVERRIDES}>
                  Search not available for this page
                </Block>
              }
              placement={PLACEMENT.bottom}
              triggerType={TRIGGER_TYPE.hover}
              overrides={{
                Body: {
                  style: {
                    zIndex: 100,
                  },
                },
              }}
            >
              <Block className="disabled-on-hover">
                <Input
                  startEnhancer={<AiOutlineSearch size={20} color="#6B6B6B" />}
                  onChange={(e: React.BaseSyntheticEvent) => {
                    console.log(e?.target?.value);
                    setInputValue(e?.target?.value ?? "");
                  }}
                  placeholder={"Search"}
                  overrides={DISABLED_SEARCH_OVERRIDES}
                  onKeyDown={(e) => {
                    console.log(e);
                    if (e.code == "Enter") onSubmit(inputValue);
                  }}
                  disabled={true}
                />
              </Block>
            </StatefulPopover>
          )}
        </Block>
        <Block
          overrides={REFRESH_BUTTON_OVERRIDES}
          onClick={() => setRefreshPressed(true)}
        >
          <IoMdRefresh size={22} />
        </Block>
      </Block>
    );
  }
);
