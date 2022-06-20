//lib
import React, { useCallback, useMemo } from "react";

//components
import { FormControl } from "baseui/form-control";
import { ProgressBar, SIZE } from "baseui/progress-bar";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Block } from "baseui/block";

//constants
import { SpecialEvent, InputStatusprops } from "../../../variableTypes";
import { STATUSNames } from "./../../../constants";

//styles
import { inputStatusFormControlStyle } from "./styles/FormControlStyles";

//function to calculate percentage of progress bar to be filled from status
function calculateStatus(status: String): number {
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

//function to get color code of status text
function getColor(status: String): string {
  if (status == "Investigating") {
    return "red";
  }
  if (status == "Identified") {
    return "#8B8000";
  }
  if (status == "Monitoring") {
    return "#FF8C00";
  } else {
    return "#006400";
  }
}

//funtion to get color code of progress bar
function getStatusBarColor(status: String): string {
  if (status == "Investigating") {
    return "#E8E0BE";
  }
  if (status == "Identified") {
    return "#FFD04F";
  }
  if (status == "Monitoring") {
    return "#F08C1A";
  } else {
    return "#33CC99";
  }
}

/**
 * InputStatus component
 * @params props contains:
 * updateStatus : Function
 * incidentStatus: string
 */
export const InputStatus = React.memo((props: InputStatusprops) => {
  /**
   * Function for handling updateStatus on progress bar click
   * @params e SpecialEvent Type only for click on inputStatus Bar
   * Added bar className to blue region of progress bar. As offset is calculated from the start of the bar
   * which is hidden so we substract the hidden part if click happens on the blue region.
   * Otherwise if click happens on the white region then we directly get the offset and calculate status.
   * Then we call props.updateStatus to update the state.
   */
  const updateStatusBarOnClick = useCallback(
    (e: SpecialEvent) => {
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
          ((e.nativeEvent.offsetX - substractedTo) * 100) /
          e.target.offsetWidth;
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
    },
    [props.incidentStatus]
  );

  /**
   * Contains the four statuses --> Investigating, Identified, Monitoring and Resolved as FlexGridItems
   */
  const flexItems = useMemo(
    () =>
      STATUSNames.map((item, index) => {
        return (
          <FlexGridItem
            key={index}
            height="scale1000"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={
              item != props.incidentStatus
                ? "black"
                : getColor(props.incidentStatus)
            }
            onClick={(e: Event) => {
              const target = e.target as Element;
              props.updateStatus(target.innerHTML);
            }}
            overrides={{ Block: { style: { cursor: "pointer" } } }}
          >
            {item}
          </FlexGridItem>
        );
      }),
    [props.incidentStatus]
  );

  return (
    <Block>
      <FormControl
        label={"Incident Status"}
        overrides={{ ...inputStatusFormControlStyle }}
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
                BarProgress: {
                  style: {
                    backgroundColor: getStatusBarColor(props.incidentStatus),
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
});
