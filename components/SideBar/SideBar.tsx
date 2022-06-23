import { Block } from "baseui/block";
import { useState } from "react";
import { navBarStyle, optionStyle } from "./SideBarStyles";

const SideBar = () => {
  const [page, setPage] = useState(0);
  return (
    <Block {...navBarStyle}>
      <Block {...optionStyle}>Incidents List View</Block>
      <Block {...optionStyle}>Incidents Form</Block>
      <Block {...optionStyle}>Components</Block>
    </Block>
  );
};

export default SideBar;
