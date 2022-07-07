import { Block } from "baseui/block";
import React from "react";
import { COMPONENT_GROUP_DETAILS_WRAPPER_OVERRIDES } from "../overrides/aboutThisStyles";
import { RenderComponents } from "./RenderComponentsList";
import { Accordion, Panel } from "baseui/accordion";

interface Props {
  componentGroupNamesMap: any;
  componentGroupsMap: any;
  componentUptimeMap: any;
}
export const RenderComponentGroups: React.FC<Props> = React.memo(
  ({ componentGroupNamesMap, componentGroupsMap, componentUptimeMap }) => {
    let renderComponentsGroupList: JSX.Element[] = [];
    componentGroupsMap.forEach(function (componentsList: any, groupID: string) {
      const group = (
        <Block
          overrides={COMPONENT_GROUP_DETAILS_WRAPPER_OVERRIDES}
          key={groupID}
        >
          <Accordion accordion>
            <Panel
              title={componentGroupNamesMap.get(groupID)}
              overrides={{
                PanelContainer: {
                  style: {
                    border: "none",
                  },
                },
                Header: {
                  style: {
                    padding: "0 0 4px 0px",
                    margin: "0px",
                    border: "none",
                    textTransform: "capitalize",
                  },
                },
                Content: {
                  style: {
                    padding: "0px",
                    margin: "0px",
                  },
                },
              }}
            >
              <RenderComponents
                componentList={componentsList}
                componentUptimeMap={componentUptimeMap}
                totalDays={90}
              />
            </Panel>
          </Accordion>
        </Block>
      );
      renderComponentsGroupList.push(group);
    });
    return <>{renderComponentsGroupList}</>;
  }
);
