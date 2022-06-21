//lib
import * as React from "react";

//components
import { FormControl } from "baseui/form-control";
import { Textarea } from "baseui/textarea";

//constants
import { IncidentMessageProps } from "../../../variableTypes";

//styles
import { messageFormControlStyle } from "./styles/FormControlStyles";
import { inputNameStyle } from "./styles/InputStyles";

/**
 * IncidentMessage Component
 * @params props contains:
 * value: string
 * updateIncidentMessage: Function
 */

export const IncidentMessage = React.memo((props: IncidentMessageProps) => {
  return (
    <FormControl label={"Message"} overrides={{ ...messageFormControlStyle }}>
      <Textarea
        value={props.value}
        onChange={(event) => {
          props.updateIncidentMessage(event);
        }}
        placeholder={"We are currently investigating this issue."}
        overrides={{
          InputContainer: {
            style: ({ $isFocused }) => ({
              backgroundColor: "white ",
              // borderColor: $isFocused ? "#1858CE" : "red",
              // border: "1px solid #E6E6E9",
            }),
            props: {
              overrides: {
                Root: {
                  style: {
                    borderRadius: "8px",
                  },
                },
              },
            },
          },
          Input: {
            style: ({ $isFocused }) => ({
              border: $isFocused ? "1px blue" : "1px  #E6E6E9",
            }),
          },
        }}
      />
    </FormControl>
  );
});
