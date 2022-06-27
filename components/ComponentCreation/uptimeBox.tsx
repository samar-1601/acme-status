import * as React from "react"
import { Block } from "baseui/block"
import { colorfullBarWrapper, getColorFullBars, componentTimelineRow, horizontalLine } from "./uptimeStyles"
import { Checkbox } from "baseui/checkbox";
import { DatePicker } from "baseui/datepicker";
import { FormControl } from "baseui/form-control";
import { checkBoxStyles, dateStyles } from "./componentCreationStyles";

export const UptimeBox = React.memo((props: any) => {
  const [date, setDate] = React.useState([new Date()]);
  const [checked, setChecked] = React.useState(false);
  return (
    <Block>
      <FormControl label="Display uptime">
        <Checkbox 
          checked={checked} 
          onChange={() => setChecked(!checked)}
          {...checkBoxStyles}
        >
          Display the historical data of this component on my status page
        </Checkbox>
      </FormControl>
      {checked && (
        <FormControl label="Select date">
          <DatePicker
            value={date}
            onChange={({ date }) => {
              setDate(Array.isArray(date) ? date : [date]);
            }}
            clearable
            {...dateStyles}
          />
        </FormControl>
      )}
    {checked && (<Block overrides={{
        Block: {
          style: {
            backgroundColor: "white",
            border: "1px solid #E6E6E9",
            height: "auto",
            width:"auto",
            padding: "20px",
            borderRadius: "8px !important",
            ":hover": {
                borderColor: "#0E61F6",
              },
          }
        }
      }}>
        <Block {...colorfullBarWrapper}>
          {getColorFullBars(90)}
        </Block>
        <Block {...componentTimelineRow}>
          <Block>{90} Days Ago</Block>
          <Block {...horizontalLine}></Block>
          <Block>{100}% uptime</Block>
          <Block {...horizontalLine}></Block>
          <Block>Today</Block>
        </Block>
      </Block>)}
    </Block>
  )
})
