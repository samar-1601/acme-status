// lib
import * as React from "react";
import { useState, useEffect, useCallback } from "react";

// components
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";

//constants
import { NEXT_PUBLIC_AUTH_TOKEN, PAGE_ID } from "../../../constants";

// styles
import {
  colorfullBar,
  colorfullBarWrapper,
  componentHeader,
  componentTimelineRow,
  componentDetailsWrapper,
  componentStatus,
  horizontalLine,
  componentListWrapper,
  componentNameText,
} from "./styles/aboutThisStyles";

const getComponents = async () => {
  try {
    let URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components`;

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const componentList = await response.json();

    return componentList;
  } catch (err) {
    console.log(err);
    alert("Too many API calls");
  }
};

const getComponentUptime = async (componentID: string) => {
  try {
    let URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components/${componentID}/uptime`;

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const uptimeResponse = await response.json();

    return uptimeResponse["uptime_percentage"];
  } catch (err) {
    console.log(err);
    alert("Couldn't find uptime percentage for component");
  }
};

const getColorFullBars = (count: number) => {
  let barsList = [];
  for (let i = 0; i < count; i++) {
    barsList.push(
      <StatefulPopover
        content={() => (
          <Block padding={"20px"} backgroundColor={"white"}>
            Details of this day !!
          </Block>
        )}
        triggerType={TRIGGER_TYPE.hover}
      >
        <Block {...colorfullBar}></Block>
      </StatefulPopover>
    );
  }
  return barsList;
};
let componentList: any[] = [];
const renderComponents = async () => {
  componentList = await getComponents();
  console.log(componentList);
  let renderComponentList: JSX.Element[] = [];
  for (const component of componentList) {
    const componentUptime = await getComponentUptime(component["id"]);
    let bars: JSX.Element = <></>;
    if (componentUptime) {
      bars = (
        <>
          <Block {...colorfullBarWrapper}>{getColorFullBars(90)}</Block>
          <Block {...componentTimelineRow}>
            <Block>90 Days Ago</Block>
            <Block {...horizontalLine}></Block>
            <Block>{componentUptime}%</Block>
            <Block {...horizontalLine}></Block>
            <Block>Today</Block>
          </Block>
        </>
      );
    }
    renderComponentList.push(
      <Block {...componentDetailsWrapper} key={component["name"]}>
        <Block {...componentHeader}>
          <Block {...componentNameText}>{component["name"]}</Block>
          <Block {...componentStatus}>{component["status"]}</Block>
        </Block>
        {bars}
      </Block>
    );
  }
  return renderComponentList;
};

export const AboutThisSite = React.memo(() => {
  const [state, setState] = useState({
    componentsList: Array(),
    isLoaded: false,
  });

  const loadComponentsList = useCallback(async () => {
    const components = await renderComponents();
    setState({ ...state, componentsList: components, isLoaded: true });
  }, []);

  const components = useEffect(() => {
    loadComponentsList();
  }, []);

  return state.isLoaded ? (
    <Block {...componentListWrapper}>{state.componentsList}</Block>
  ) : (
    <Block
      overrides={{
        Block: {
          style: {
            marginTop: "15vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      }}
    >
      <Spinner />
    </Block>
  );
});
