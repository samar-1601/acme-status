import { Block } from "baseui/block";
// styles
import {
  COLORFUL_BAR_WRAPPER_OVERRIDES,
  COMPONENT_HEADER_OVERRIDES,
  COMPONENT_TIMELINE_ROW_OVERRIDES,
  COMPONENT_DETAILS_WRAPPER_OVERRIDES,
  COMPONENT_STATUS_OVERRIDES,
  HORIZONTAL_LINE_OVERRIDES,
  COMPONENT_NAME_TEXT_OVERRIDES,
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
            <Block overrides={COLORFUL_BAR_WRAPPER_OVERRIDES}>
              <ColoredBars totalDays={totalDays} />
            </Block>
            <Block overrides={COMPONENT_TIMELINE_ROW_OVERRIDES}>
              <Block>{totalDays} Days Ago</Block>
              <Block width="1px" overrides={HORIZONTAL_LINE_OVERRIDES}></Block>
              <Block>{componentUptime}% uptime</Block>
              <Block width="1px" overrides={HORIZONTAL_LINE_OVERRIDES}></Block>
              <Block>Today</Block>
            </Block>
          </>
        );
      }
      renderComponentList.push(
        <Block
          overrides={COMPONENT_DETAILS_WRAPPER_OVERRIDES}
          key={component["id"]}
        >
          <Block overrides={COMPONENT_HEADER_OVERRIDES}>
            <Block overrides={COMPONENT_NAME_TEXT_OVERRIDES}>
              {component["name"]}
            </Block>
            <Block overrides={COMPONENT_STATUS_OVERRIDES}>
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
