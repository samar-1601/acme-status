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
} from "../styles/aboutThisStyles";

// loading and helper functions
import { getComponentUptime } from "./LoadAboutPageData";
import { formatDate } from "../list-view-incidents/IncidentsListViewHelperFunctions";

// constants
import { getComponentStatusText , PageType } from "../../../../constants";
import {
  hoverBox,
  hoverDateStyle,
  hoverRelatedTextStyle,
} from "../styles/barHoverStyles";

const totalDays: number = 90; // total no. of days for whcih we are rendering data

/**
 * get random values for bars
 * @param days size of list to generate
 * @returns a list of random values for colored status bars
 */
export const GenerateBarsData = (days:number)=>{
  let list:any[] = [];
  for(let day = 0; day<days; day++)
  {
      const downTime = Math.floor(Math.random() * 70);
      list.push(downTime);
  }
  return list;
}

// TODO: NEED TO HAVE AN API TO BUILD THE COLOR BAR VALUES
const barColorDeterminer = (value: number) => {
  if (value < 20) return "rgb(179, 186, 197)"; // grey
  if (value < 60) return "#2fcc66"; //green
  if (value < 65) return "#f1c40f"; // yellow

  return "#e74c3c"; // red
};

/**
 * get the date to show when we hover over a bar
 * @param day the day number 
 * @returns formatted date for a given bar's date
 */
const getDateforBar = (day: number) => {
  const daysAgo = totalDays - day;
  let date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return formatDate(date, PageType.Completed); // get formatted date in "08 June 2022" format
};

/**
 * get the status bars for components
 * @param count the number of bars tom render
 * @returns List of render ready bars
 */
const getColorFullBars = (count: number) => {
  let barsList = [];
  const barValues = GenerateBarsData(count);
  for (let i = 0; i < count; i++) {
    barsList.push(
      <StatefulPopover
        key={`bar${i}`}
        content={() => (
          <Block {...hoverBox}>
            <Block {...hoverDateStyle}>{getDateforBar(i)}</Block>
            <Block {...hoverRelatedTextStyle}>Related</Block>
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

/**
 * get render ready list for a given components list
 * @param componentList List of components
 * @returns formatted list with required styling
 */
export const renderComponents = async (componentList: any[]) => {
  let renderComponentList: JSX.Element[] = [];
  if (componentList != undefined) {
    for (const component of componentList) {
      const componentUptime = await getComponentUptime(component["id"]); // get the uptime percentage for the component
      let bars: JSX.Element = <></>;
      if (componentUptime) {
        // if the component has uptime, then return 90 day colored status bars 
        bars = (
          <>
            <Block {...colorfullBarWrapper}>
              {getColorFullBars(totalDays)}
            </Block>
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
        <Block {...componentDetailsWrapper} key={component["id"]}>
          <Block {...componentHeader}>
            <Block {...componentNameText}>{component["name"]}</Block>
            <Block {...componentStatus}>{getComponentStatusText(component["status"])}</Block>
          </Block>
          {bars}
        </Block>
      );
    }
  }
  return renderComponentList;
};
