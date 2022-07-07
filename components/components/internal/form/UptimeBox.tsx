// lib
import * as React from "react";

// components
import { Block } from "baseui/block";
import { Checkbox } from "baseui/checkbox";
import { DatePicker } from "baseui/datepicker";
import { FormControl } from "baseui/form-control";

// styles
import {
  CHECKBOX_STYLES,
  COLORFULL_BAR_WRAPPER,
  COMPONENT_TIMELINE_ROW,
  DATE_STYLES,
  getColorFullBars,
  HORIZONTAL_LINE,
} from "../overrides/componentFormStyles";

export const UptimeBox = React.memo((props: any) => {
  const [date, setDate] = React.useState([new Date()]);
  const [checked, setChecked] = React.useState(false);
  return (
    <Block>
      <FormControl label="Display uptime">
        <Checkbox
          overrides={CHECKBOX_STYLES}
          checked={checked}
          onChange={() => setChecked(!checked)}
        >
          Display the historical data of this component on my status page
        </Checkbox>
      </FormControl>
      {checked && (
        <FormControl label="Select date">
          <DatePicker
            overrides={DATE_STYLES}
            value={date}
            onChange={({ date }) => {
              setDate(Array.isArray(date) ? date : [date]);
            }}
            clearable
          />
        </FormControl>
      )}
      {checked && (
        <Block
          overrides={{
            Block: {
              style: {
                backgroundColor: "white",
                border: "1px solid #E6E6E9",
                height: "auto",
                width: "auto",
                padding: "20px",
                borderRadius: "8px !important",
                ":hover": {
                  borderColor: "#0E61F6",
                },
              },
            },
          }}
        >
          <Block overrides={COLORFULL_BAR_WRAPPER}>
            {getColorFullBars(90)}
          </Block>
          <Block overrides={COMPONENT_TIMELINE_ROW}>
            <Block>{90} Days Ago</Block>
            <Block overrides={HORIZONTAL_LINE}></Block>
            <Block>{100}% uptime</Block>
            <Block overrides={HORIZONTAL_LINE}></Block>
            <Block>Today</Block>
          </Block>
        </Block>
      )}
    </Block>
  );
});
