//lib
import React, { useCallback, useMemo } from "react";

//components
import { FormControl } from "baseui/form-control";
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
          <Block>
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
                    boxShadow: "0 0 3px 0 rgba(0, 0, 0, 1)",
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
