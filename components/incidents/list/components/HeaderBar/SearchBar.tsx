// lib
import React, { useEffect } from "react";

// components
import { Block } from "baseui/block";
import { Input } from "baseui/input";
import { StatefulPopover, PLACEMENT, TRIGGER_TYPE } from "baseui/popover";
import { AiOutlineSearch } from "react-icons/ai";

// constants
import { PageType } from "../../../../../constants";

// styles
import {
  SEARCH_WRAPPER_OVERRIDES,
  SEARCH_OVERRIDES,
  SEARCH_HOVER_OVERRIDES,
  DISABLED_SEARCH_OVERRIDES,
} from "../../overrides/navStyles";

/**
 * Variables to set the search bar contents according to the current page selected on the navigation menu
 */
interface Props {
  activePage: PageType;
  onSubmit: Function;
  query: string;
}
/**
 * React component for Serach bar functinality
 */
export const SearchBar: React.FC<Props> = React.memo(
  ({ activePage, onSubmit, query }) => {
    const [inputValue, setInputValue] = React.useState<string>(query);

    // reset the query when new page is selected from the navigation menu
    useEffect(() => {
      setInputValue(query);
    }, [query]);

    return (
      <Block overrides={SEARCH_WRAPPER_OVERRIDES}>
        {activePage == PageType.All ? (
          // Search enabled for "All" menu
          <Block>
            <Input
              startEnhancer={<AiOutlineSearch size={20} color="#6B6B6B" />}
              onChange={(e: React.BaseSyntheticEvent) => {
                setInputValue(e?.target?.value ?? "");
              }}
              value={inputValue}
              placeholder={"Search"}
              overrides={SEARCH_OVERRIDES}
              onKeyDown={(e) => {
                if (e.code == "Enter") onSubmit(inputValue);
              }}
            />
          </Block>
        ) : (
          // Search disabled for other menus
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
