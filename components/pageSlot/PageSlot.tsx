// lib
import * as React from "react";
import { Children, useEffect, useState } from "react";

// components
import { Block } from "baseui/block";
import Head from "next/head";

// styles
import {
  leftNavBarStyles,
  leftNavBarStylesCollapsed,
  pageWrapperStyles,
  rightContentStyles,
} from "./pageSlotStyles";
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
  return <Block {...rightContentStyles}>{rightContent?.props?.children}</Block>;
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

  const handleIsOpenChange = () => {
    localStorage.setItem("isSideBarOpen", `${!isOpen}`);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Head>
        <title>statusapp</title>
        <link rel="icon" href="/Status_icon.png" />
      </Head>
      <Block {...pageWrapperStyles}>
        {isOpen ? (
          <Block {...leftNavBarStyles}>
            <FullSideBar
              activeItemID={activeMenuItem}
              handleIsOpenChange={handleIsOpenChange}
            />
          </Block>
        ) : (
          <Block {...leftNavBarStylesCollapsed}>
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
