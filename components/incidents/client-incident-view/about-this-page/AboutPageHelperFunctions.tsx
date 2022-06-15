// components
import { Block } from "baseui/block";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";

// styles
import {
    colorfullBar,
    colorfullBarWrapper,
    componentHeader,
    componentTimelineRow,
    componentDetailsWrapper,
    componentStatus,
    horizontalLine,
    componentNameText,
  } from "./styles/aboutThisStyles";
  

// loading functions
import { getComponentUptime } from "./LoadAboutPageData";
import { GenerateBarsData } from "./BarsDataGenerator";

// total no. of days for whcih we are rendering data
const totalDays:number = 90;

// TODO: NEED TO HAVE AN API TO BUILD THE COLOR BAR VALUES
export const barColorDeterminer = (value: number) => {
    if (value < 20) return "rgb(179, 186, 197)"; // grey
    if (value < 60) return "#2fcc66"; //green
    if (value < 65) return "#f1c40f"; // yellow
  
    return "#e74c3c"; // red
  };
  
  const getDateforBar = (day:number)=>{
    const daysAgo = totalDays-day;
    let date = new Date();
    date.setDate(date.getDate()-daysAgo);
    return 
  }
  
  const getColorFullBars = (count: number) => {
    let barsList = [];
    const barValues = GenerateBarsData(count);
    for (let i = 0; i < count; i++) {
      barsList.push(
        <StatefulPopover
          key={`bar${i}`}
          content={() => (
            <Block padding={"20px"} backgroundColor={"white"}>
              Details of this day !!
            </Block>
          )}
          triggerType={TRIGGER_TYPE.hover}
        >
          <Block
            {...colorfullBar}
            backgroundColor={barColorDeterminer(barValues[i])}
          ></Block>
        </StatefulPopover>
      );
    }
    return barsList;
  };
  
  export const renderComponents = async (componentList:any[]) => {
    
    let renderComponentList: JSX.Element[] = [];
    if (componentList != undefined) {
      for (const component of componentList) {
        const componentUptime = await getComponentUptime(component["id"]);
        let bars: JSX.Element = <></>;
        if (componentUptime) {
          bars = (
            <>
              <Block {...colorfullBarWrapper}>{getColorFullBars(totalDays)}</Block>
              <Block {...componentTimelineRow}>
                <Block>{totalDays} Days Ago</Block>
                <Block {...horizontalLine}></Block>
                <Block>{componentUptime}% uptime</Block>
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
    }
    return renderComponentList;
  };