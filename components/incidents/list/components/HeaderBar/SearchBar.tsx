import { Block } from "baseui/block";
import { Input } from "baseui/input";
import { StatefulPopover, PLACEMENT, TRIGGER_TYPE } from "baseui/popover";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { PageType } from "../../../../../constants";
import {
  SEARCH_WRAPPER_OVERRIDES,
  SEARCH_OVERRIDES,
  SEARCH_HOVER_OVERRIDES,
  DISABLED_SEARCH_OVERRIDES,
} from "../../overrides/navStyles";

interface Props {
  activePage: PageType;
  onSubmit: Function;
}
export const SearchBar: React.FC<Props> = React.memo(
  ({ activePage, onSubmit }) => {
    const [inputValue, setInputValue] = React.useState<string>("");
    return (
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
    );
  }
);
