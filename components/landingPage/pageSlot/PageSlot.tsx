// lib
import * as React from "react";
import { Children } from "react";

// components
import { Block } from "baseui/block";
import Head from "next/head";

// styles
import {
  constantPaneStyles,
  leftNavBarStyles,
  pageWrapperStyles,
  rightContentStyles,
  leftNavBarStylesHidden,
} from "./PageSlotStyles";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

const Slot: React.FC<{
  name: "leftNavBar" | "rightContent";
}> = () => null;

interface Props {
  rightContent: any;
}

const RightContent: React.FC<Props> = React.memo(({ rightContent }) => {
  return <Block {...rightContentStyles}>{rightContent?.props?.children}</Block>;
});

export const PageSlot = ({
  isOpen,
  handleIsOpenChange,
  children,
}: {
  isOpen: boolean;
  handleIsOpenChange: Function;
  children: Array<React.ReactElement>;
}) => {
  const childrenArray = Children.toArray(
    children
  ) as unknown as React.ReactElement[];
  const leftNavBar = childrenArray.find(
    (child) => child.props.name === "leftNavBar"
  );
  const rightContent = childrenArray.find(
    (child) => child?.props?.name === "rightContent"
  );
  return (
    <>
      <Head>
        <title>statusapp</title>
        <link rel="icon" href="/Status_icon.png" />
      </Head>
      <Block {...pageWrapperStyles}>
        <Block
          {...constantPaneStyles}
          onClick={() => {
            handleIsOpenChange();
          }}
        >
          {isOpen ? (
            <AiOutlineDoubleLeft size={28} />
          ) : (
            <AiOutlineDoubleRight size={28} />
          )}
        </Block>
        {isOpen ? (
          <Block {...leftNavBarStyles}>{leftNavBar?.props?.children}</Block>
        ) : (
          <Block {...leftNavBarStylesHidden}>
            {leftNavBar?.props?.children}
          </Block>
        )}
        <RightContent rightContent={rightContent} />
      </Block>
    </>
  );
};

PageSlot.Slot = Slot;
