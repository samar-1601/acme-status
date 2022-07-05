// lib
import * as React from "react";
import { Children, useState } from "react";

// components
import { Block } from "baseui/block";
import Head from "next/head";

// styles
import {
  LEFT_CONTENT_OVERRIDES,
  COLLAPSED_LEFT_CONTENT_OVERRIDES,
  PAGE_WRAPPER_OVERRIDES,
  RIGHT_CONTENT_OVERRIDES,
} from "./overrides/pageSlotStyles";
import { SideBarMenu } from "../../constants";
import FullSideBar from "../leftPageSlot/fullSideBar/FullSideBar";
import CollapsedSideBar from "../leftPageSlot/collapsedSideBar/CollapsedSideBar";

const Slot: React.FC<{
  name: "leftNavBar" | "rightContent";
}> = () => null;

interface RightProps {
  rightContent: any;
}

const RightContent: React.FC<RightProps> = React.memo(({ rightContent }) => {
  return (
    <Block overrides={RIGHT_CONTENT_OVERRIDES}>
      {rightContent?.props?.children}
    </Block>
  );
});

export const PageSlot = ({
  children,
  activeMenuItem,
}: {
  children: React.ReactElement;
  activeMenuItem: SideBarMenu;
}) => {
  const childrenArray = Children.toArray(
    children
  ) as unknown as React.ReactElement[];
  const rightContent = childrenArray.find(
    (child) => child.props.name === "rightContent"
  );

  const [isOpen, setIsOpen] = useState<boolean>(
    localStorage.getItem("isSideBarOpen") == "false" ? false : true
  );

  const handleIsOpenChange = React.useCallback(() => {
    localStorage.setItem("isSideBarOpen", `${!isOpen}`);
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <>
      <Head>
        <title>Status App</title>
        <link rel="icon" href="/Status_icon.png" />
      </Head>
      <Block overrides={PAGE_WRAPPER_OVERRIDES}>
        {isOpen ? (
          <Block overrides={LEFT_CONTENT_OVERRIDES}>
            <FullSideBar
              activeItemID={activeMenuItem}
              handleIsOpenChange={handleIsOpenChange}
            />
          </Block>
        ) : (
          <Block overrides={COLLAPSED_LEFT_CONTENT_OVERRIDES}>
            <CollapsedSideBar
              activeItemID={activeMenuItem}
              handleIsOpenChange={handleIsOpenChange}
            />
          </Block>
        )}
        <RightContent rightContent={rightContent} />
      </Block>
    </>
  );
};

PageSlot.Slot = Slot;
