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
  COMPONENT_DETAILS_WRAPPER_NO_BORDER_OVERRIDES,
} from "../overrides/aboutThisStyles";
import { getComponentStatusText } from "../../../../../constants";
import { ColoredBars } from "./ColoredBars";
import React from "react";

interface Props {
  totalDays: number;
  componentList: any[];
  componentUptimeMap: any;
  fromComponentGroup?: boolean;
}
/**
 * get render ready list for a given components list
 * @param componentList List of components
 * @returns formatted list with required styling
 */
export const RenderComponentsList: React.FC<Props> = React.memo(
  ({ totalDays, componentList, componentUptimeMap, fromComponentGroup }) => {
    let renderComponentList: JSX.Element[] = [];
    if (componentList) {
      for (const component of componentList) {
        let componentUptime = componentUptimeMap.get(component["id"]);
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
                <Block
                  width="1px"
                  overrides={HORIZONTAL_LINE_OVERRIDES}
                ></Block>
                <Block>{componentUptime}% uptime</Block>
                <Block
                  width="1px"
                  overrides={HORIZONTAL_LINE_OVERRIDES}
                ></Block>
                <Block>Today</Block>
              </Block>
            </>
          );
        }
        renderComponentList.push(
          <Block
            overrides={
              fromComponentGroup
                ? componentList.length == 1
                  ? COMPONENT_DETAILS_WRAPPER_NO_BORDER_OVERRIDES
                  : COMPONENT_DETAILS_WRAPPER_OVERRIDES
                : COMPONENT_DETAILS_WRAPPER_OVERRIDES
            }
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
    return <>{renderComponentList}</>;
  }
);
