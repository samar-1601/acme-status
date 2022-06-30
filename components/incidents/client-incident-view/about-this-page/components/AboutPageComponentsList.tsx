import { Block } from "baseui/block";
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
} from "../overrides/aboutThisStyles";
import { getComponentUptime } from "../helpers/loadAboutPageData";
import { getComponentStatusText } from "../../../../../constants";
import { ColoredBars } from "./ColoredBars";

/**
 * get render ready list for a given components list
 * @param componentList List of components
 * @returns formatted list with required styling
 */
export const renderComponents = async (
  totalDays: number,
  componentList: any[]
) => {
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
              <ColoredBars totalDays={totalDays} />
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
            <Block {...componentStatus}>
              {getComponentStatusText(component["status"])}
            </Block>
          </Block>
          {bars}
        </Block>
      );
    }
  }
  return renderComponentList;
};
