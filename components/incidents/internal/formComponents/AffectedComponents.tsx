//lib
import React, { useCallback } from "react";

//components
import { SelectStatusComponent } from "./SelectStatusComponent";
import { Block } from "baseui/block";
import { FormControl } from "baseui/form-control";

//constants
import { AFFECTED_COMPONENTS_OVERRIDES } from "../form/overrides/BlockOverrides";
import { ComponentObject } from "../../../../types";

const label = <Block>Components Affected</Block>;

interface ComponentsAffectedProps {
  componentList: ComponentObject[];
  handleComponentUpdate: Function;
}

/**
 * AffectedComponents Component
 * @params props contains:
 * componentList: list of components containing isSelected and type of choice
 * handleComponentUpdate: Funtion
 */

export const AffectedComponents = React.memo(
  (props: ComponentsAffectedProps) => {
    return (
      <Block overrides={{ ...AFFECTED_COMPONENTS_OVERRIDES }}>
        <FormControl
          label={label}
          overrides={{
            ControlContainer: {
              style: ({ $theme }) => ({
                borderTop: "solid 1.5px rgb(226,226,226)",
                borderBottom: "solid 1.5px rgb(226,226,226)",
              }),
            },
          }}
        >
          <div>
            {props.componentList.map((item) => {
              return (
                <SelectStatusComponent
                  key={item.id}
                  name={item.compName}
                  id={item.id}
                  type={item.compType}
                  selected={item.selected}
                  handleChange={props.handleComponentUpdate}
                />
              );
            })}
          </div>
        </FormControl>
      </Block>
    );
  }
);
