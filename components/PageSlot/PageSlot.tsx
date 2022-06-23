import * as React from "react";
import { Children } from "react";
import { Block } from "baseui/block";
import {
  leftNavBarStyles,
  pageWrapperStyles,
  rightContentStyles,
} from "./PageSlotStyles";

const Slot: React.FC<{
  name: "leftNavBar" | "rightContent";
}> = () => null;

export const PageSlot = ({
  children,
}: {
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
    <Block {...pageWrapperStyles}>
      <Block {...leftNavBarStyles}>{leftNavBar?.props?.children}</Block>
      <Block {...rightContentStyles}>{rightContent?.props?.children}</Block>
    </Block>
  );
};

PageSlot.Slot = Slot;