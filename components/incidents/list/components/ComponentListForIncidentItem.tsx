// lib
import * as React from "react";

// components
import Image from "next/image";
import { Block } from "baseui/block";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";

// constants
import {
  ComponentStatusIconUrls,
  getDisplayComponentStatusText,
} from "../../../../constants";

// styles
import {
  COMPONENT_OVERRIDES,
  COMPONENT_ITEM_OVERRIDES,
  COMPONENT_ITEM_ICON_WRAPPER_OVERRIDES,
  COMPONENT_ICON_HOVER_OVERRIDES,
} from "../overrides/listStyles";

interface Props {
  /**
   * incident for which we need the components
   */
  incident: any;
}
/**
 * getComponents
 * @param incident the incident for which the components list is made
 * @returns JSX containing the components in the current incident
 */
export const ComponentsListForIncident: React.FC<Props> = React.memo(
  ({ incident }): JSX.Element => {
    let componentsList: JSX.Element[] = []; // List to store the formatted components list

    // if there are components for the incident
    if (incident["components"]) {
      // iterate through the component list
      incident["components"].forEach((component: any) => {
        const renderComponent: JSX.Element = // variable storing the formatted component ready to render
          (
            <Block key={component["name"]} overrides={COMPONENT_ITEM_OVERRIDES}>
              <StatefulPopover
                content={
                  <Block overrides={COMPONENT_ICON_HOVER_OVERRIDES}>
                    {getDisplayComponentStatusText(component["status"])}
                  </Block>
                }
                triggerType={TRIGGER_TYPE.hover}
              >
                <Block overrides={COMPONENT_ITEM_ICON_WRAPPER_OVERRIDES}>
                  <Image // NextJS component for rendering Image
                    src={ComponentStatusIconUrls(component["status"])} // get the src address for the component based on its status
                    height="16px"
                    width="16px"
                  ></Image>
                </Block>
              </StatefulPopover>
              {component["name"]}
            </Block>
          );
        componentsList.push(renderComponent); // push the formatted component to the list
      });
    }
    if (componentsList.length > 0) {
      return <Block overrides={COMPONENT_OVERRIDES}>{componentsList}</Block>;
    }
    // handling the case when no component has been affected by the incident
    return (
      <Block
        overrides={{
          Block: {
            style: {
              color: "#808080",
              marginTop: "18px",
              paddingBottom: "8px",
            },
          },
        }}
      >
        No components affected
      </Block>
    );
  }
);
