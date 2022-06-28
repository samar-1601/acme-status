import * as React from "react";
import { useStyletron } from "styletron-react";

interface Props {
  updateIncidentMessage: Function;
  value: string | number | undefined;
}

export const StyledTextArea: React.FC<Props> = React.memo((props) => {
  const [css] = useStyletron();
  return (
    <textarea
      value={props.value}
      onChange={(event) => {
        props.updateIncidentMessage(event);
      }}
      placeholder={"We are currently investigating this issue."}
      className={css({
        resize: "none",
        width: "100%",
        height: "96px",
        font: "inherit",
        borderRadius: "8px",
        backgroundColor: "white",
        borderColor: "#E6E6E9",
        fontSize: "inhertit",
        padding: "10px 14px 10px 14px",
        boxSizing: "border-box",
        borderWidth: "1px",
        outline: "none",
        ":hover": {
          borderColor: "#0E61F6",
        },
        ".focus": {
          borderColor: "#0E61F6",
        },
      })}
    />
  );
});
