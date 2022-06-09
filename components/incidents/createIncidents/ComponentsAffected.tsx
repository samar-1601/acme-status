import { FormControl } from "baseui/form-control";
import styles from "../../../styles/CreateIncident.module.css";
import SelectStatusComponent from "./SelectStatusComponent";
import React from "react";
import { ComponentsAffectedProps } from "../../../variableTypes";

const label = <div className={styles.componentLabel}>Components Affected</div>;

export default function ComponentsAffected(props: ComponentsAffectedProps) {
  return (
    <FormControl
      label={label}
      overrides={{
        ControlContainer: {
          style: ({ $theme }) => ({
            borderStyle: "solid none",
            borderColor: $theme.colors.borderOpaque,
          }),
        },
      }}
    >
      <div className={styles.components}>
        {props.componentList.map((item) => {
          return (
            <SelectStatusComponent
              key={item.id}
              name={item.compName}
              id={item.id}
              type={item.compType}
              selected={item.selected}
              toggleCheckBox={(event: React.SyntheticEvent) =>
                props.toggleCheckBox(event)
              }
              changeOption={(event: React.SyntheticEvent, compId: Number) =>
                props.changeOption(event, compId)
              }
            />
          );
        })}
      </div>
    </FormControl>
  );
}
