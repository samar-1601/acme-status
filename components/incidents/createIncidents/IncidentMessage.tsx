import { FormControl } from "baseui/form-control";
import { Textarea } from "baseui/textarea";
//not able to use value here as a prop of Textarea

import { IncidentMessageProps } from "../../../variableTypes";

export default function IncidentMessage(props: IncidentMessageProps) {
  return (
    <FormControl label={"Message"}>
      <Textarea
        onChange={(event) => {
          props.updateIncidentMessage(event);
        }}
        placeholder={"We are currently investigating this issue."}
      />
    </FormControl>
  );
}
