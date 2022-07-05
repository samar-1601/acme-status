//lib
import React, { useCallback, useEffect, useMemo } from "react";

//components
import { FormControl } from "baseui/form-control";
import {
  ProgressBar,
  ProgressBarRounded,
  SIZE,
  StyledBarProgress,
} from "baseui/progress-bar";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Block } from "baseui/block";
import { Slider } from "baseui/slider";

//helpers
import {
  calculateStatus,
  getStatusBarColor,
  getStatusFromPercentage,
} from "../helpers/helperFunctions";

//constants
import { STATUSNames } from "../../../../constants";

//styles
import { INPUT_STATUS_OVERRIDES } from "../form/overrides/FormControlOverrides";
import { State } from "baseui/input";
import { withStyle } from "baseui";
import { BsCircleFill } from "react-icons/bs";

interface InputStatusOnClickEvent {
  nativeEvent: {
    offsetX: number;
  };
  target: {
    offsetWidth: number;
    classList: DOMTokenList;
    innerHTML: string;
  };
}

interface InputStatusprops {
  updateStatus: Function;
  incidentStatus: String;
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
    (e: InputStatusOnClickEvent) => {
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
      props.updateStatus(getStatusFromPercentage(percentage));
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
            color={item != props.incidentStatus ? "black" : "blue"}
            onClick={(e: Event) => {
              console.log(item);
              props.updateStatus(item);
            }}
            overrides={{
              Block: {
                style: { cursor: "pointer" },
                props: { className: "block-hover-state" },
              },
            }}
          >
            {item}
          </FlexGridItem>
        );
      }),
    [props.incidentStatus, props.updateStatus]
  );

  return (
    <Block>
      <FormControl
        label={"Incident Status"}
        overrides={{ ...INPUT_STATUS_OVERRIDES }}
      >
        <>
          <Block
          // overrides={{
          //   Block: {
          //     props: {
          //       onClick: (event: InputStatusOnClickEvent) =>
          //         updateStatusBarOnClick(event),
          //     },
          //   },
          // }}
          >
            {/* <ProgressBar
              value={calculateStatus(props.incidentStatus)}
              size={SIZE.large}
              steps={undefined}
              overrides={{
                Bar: {
                  style: ({ $theme }) => ({
                    cursor: "pointer",
                    margin: "25px 10% 0px",
                    height: "6px",
                    position: "relative",
                  }),
                  props: {
                    className: "bar",
                  },
                },
                BarContainer: {
                  style: {},
                  props: {
                    className: "root",
                  },
                },
                BarProgress: {
                  style: ({ $value }) => {
                    return {
                      backgroundColor: getStatusBarColor(props.incidentStatus),
                      position: "relative",
                      transition:
                        "transform ease 0.2s, background-color ease 0.2s",
                      ":after": {
                        position: "absolute",
                        content: `"A"`,
                        zIndex: "100",
                        backgroundColor: "white",
                        left: "5px",
                      },
                    };
                  },
                },
              }}
            /> */}
            <Slider
              value={[calculateStatus(props.incidentStatus)]}
              onChange={(value) => {
                console.log(value.value[0]);
                props.updateStatus(getStatusFromPercentage(value.value[0]));
              }}
              marks={false}
              overrides={{
                Root: {
                  style: ({ $theme }) => ({
                    cursor: "pointer",
                    margin: "20px 10% 10px",
                    height: "30px",
                    width: "80%",
                  }),
                },
                TickBar: {
                  style: {
                    display: "none",
                  },
                },
                Thumb: {
                  style: {
                    backgroundColor: getStatusBarColor(props.incidentStatus),
                    boxShadow: "0 0 5px 0 rgba(0, 0, 0, 1)",
                    height: "20px",
                    width: "20px",
                    zIndex: "1000",
                  },
                },
                ThumbValue: {
                  style: { display: "none" },
                },
                InnerTrack: {
                  style: ({ $value }) => ({
                    height: "4px",
                    background: `linear-gradient(to right, ${getStatusBarColor(
                      props.incidentStatus
                    )} 0%, ${getStatusBarColor(
                      props.incidentStatus
                    )} ${$value}%, rgb(226, 226, 226) ${$value}%, rgb(226, 226, 226) 100%)`,
                  }),
                },
                InnerThumb: {
                  style: {
                    display: "none",
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
