import { Block } from "baseui/block";
import Router from "next/router";
import { useState } from "react";
import { sideBarHeaderName, sideBarStyle } from "./SideBarStyles";

interface Props {
  activeItemID: number;
}
const SideBar: React.FC<Props> = ({ activeItemID }) => {
  const [page, setPage] = useState(activeItemID);
  const handleClick = (id: number) => {
    setPage(id);
    if (id == 0) Router.push("/incidents");
    else if (id == 1) Router.push("/incident/new");
    else if (id == 2) Router.push("/component");
  };
  return (
    <Block {...sideBarStyle}>
      <Block {...sideBarHeaderName}>statuspage</Block>
      <Block
        onClick={() => handleClick(0)}
        overrides={{
          Block: {
            style: {
              backgroundColor: `${page == 0 ? "lightblue" : ""}`, // toggle the style based on the active page
              color: `${page == 0 ? "rgb(20,47,93)" : "#F8F8FA"}`, // toggle the style based on the active page
              padding: "20px",
              cursor: "pointer",
              textAlign: "center",
            },
            props: { className: "hoverSideBarOption" },
          },
        }}
      >
        Incidents List View
      </Block>
      <Block
        onClick={() => handleClick(1)}
        overrides={{
          Block: {
            style: {
              backgroundColor: `${page == 1 ? "lightblue" : ""}`, // toggle the style based on the active page
              color: `${page == 1 ? "rgb(20,47,93)" : "#F8F8FA"}`, // toggle the style based on the active page
              padding: "20px",
              cursor: "pointer",
              textAlign: "center",
            },
            props: { className: "hoverSideBarOption" },
          },
        }}
      >
        Incidents Form
      </Block>
      <Block
        onClick={() => handleClick(2)}
        overrides={{
          Block: {
            style: {
              backgroundColor: `${page == 2 ? "lightblue" : ""}`, // toggle the style based on the active page
              color: `${page == 2 ? "rgb(20,47,93)" : "#F8F8FA"}`, // toggle the style based on the active page
              padding: "20px",
              cursor: "pointer",
              textAlign: "center",
            },
            props: { className: "hoverSideBarOption" },
          },
        }}
      >
        Components
      </Block>
    </Block>
  );
};

export default SideBar;
