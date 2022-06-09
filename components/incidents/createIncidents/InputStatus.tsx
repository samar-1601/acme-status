import { FormControl } from "baseui/form-control";
import styles from "../../../styles/CreateIncident.module.css";
import { ProgressBar, SIZE } from "baseui/progress-bar";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Block, BlockProps } from "baseui/block";
import React from "react";
import { SpecialEvent, InputStatusprops } from "../../../variableTypes";
import { STATUSNames } from "./../../../constants";

function calculateStatus(status: String) {
  if (status == "Investigating") {
    return 0;
  }
  if (status == "Identified") {
    return 33;
  }
  if (status == "Monitoring") {
    return 66;
  } else {
    return 100;
  }
}

export default function InputStatus(props: InputStatusprops) {
  const itemProps: BlockProps = {
    height: "scale1000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    onClick: (event) => {
      props.updateStatus(event);
    },
    overrides: {
      Block: {
        style: {
          cursor: "pointer",
        },
      },
    },
  };
  const selectedItemProps: BlockProps = {
    height: "scale1000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "blue",
    onClick: (event) => {
      props.updateStatus(event);
    },
  };

  const flexItems = STATUSNames.map((item, index) => {
    if (item != props.incidentStatus) {
      return (
        <FlexGridItem key={index} {...itemProps}>
          {item}
        </FlexGridItem>
      );
    } else {
      return (
        <FlexGridItem key={index} {...selectedItemProps}>
          {item}
        </FlexGridItem>
      );
    }
  });
  return (
    <div className={styles.incidentStatus}>
      <FormControl
        label={"Incident Status"}
        overrides={{
          ControlContainer: {
            style: ({ $theme }) => ({
              backgroundColor: $theme.colors.backgroundTertiary,
            }),
          },
        }}
      >
        <>
          <Block
            overrides={{
              Block: {
                props: {
                  onClick: (event: SpecialEvent) =>
                    props.updateStatusBarOnClick(event),
                },
              },
            }}
          >
            <ProgressBar
              value={calculateStatus(props.incidentStatus)}
              size={SIZE.large}
              steps={undefined}
              overrides={{
                Bar: {
                  style: ({ $theme }) => ({
                    cursor: "pointer",
                    margin: "25px 110px 0px 110px",
                  }),
                  props: {
                    className: "bar",
                  },
                },
                Root: {
                  props: {
                    className: "root",
                  },
                },
              }}
            />
          </Block>
          <FlexGrid
            flexGridColumnCount={4}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
          >
            {flexItems}
          </FlexGrid>
        </>
      </FormControl>
    </div>
  );
}
