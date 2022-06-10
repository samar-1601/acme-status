import React from "react";
import { FormControl } from "baseui/form-control";
import { ProgressBar, SIZE } from "baseui/progress-bar";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Block, BlockProps } from "baseui/block";
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
    onClick: (e: Event) => {
      const target = e.target as Element;
      props.updateStatus(target.innerHTML!);
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
    onClick: (e: Event) => {
      const target = e.target as Element;
      props.updateStatus(target.innerHTML!);
    },
  };

  const updateStatusBarOnClick = (e: SpecialEvent) => {
    let percentage = 0;
    if (e.target.classList.contains("root")) {
      return;
    }
    if (!e.target.classList.contains("bar")) {
      let substractedTo = 0;
      if (props.incidentStatus == "Identified") {
        substractedTo = (66 / 100) * e.target.offsetWidth;
      } else if (props.incidentStatus == "Monitoring") {
        substractedTo = (33 / 100) * e.target.offsetWidth;
      }
      percentage =
        ((e.nativeEvent.offsetX - substractedTo) * 100) / e.target.offsetWidth;
    } else {
      percentage = (e.nativeEvent.offsetX * 100) / e.target.offsetWidth;
    }
    if (percentage < 16) {
      props.updateStatus("Investigating");
    } else if (percentage < 50) {
      props.updateStatus("Identified");
    } else if (percentage < 83) {
      props.updateStatus("Monitoring");
    } else {
      props.updateStatus("Resolved");
    }
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
    <Block
    // overrides={{
    //   Block: { style: { backgroundColor: "rbg(118, 118, 118)" } },
    // }}
    >
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
                    updateStatusBarOnClick(event),
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
                BarContainer: {
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
    </Block>
  );
}
