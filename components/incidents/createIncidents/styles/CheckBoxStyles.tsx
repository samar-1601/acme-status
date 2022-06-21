import { CheckboxProps } from "baseui/checkbox";

export const checkBoxStyles: CheckboxProps = {
  overrides: {
    Root: {
      style: {
        paddingTop: "15px",
      },
    },
    Checkmark: {
      style: ({ $checked }) => ({
        borderLeftColor: "blue",
        borderRightColor: "blue",
        borderTopColor: "blue",
        borderBottomColor: "blue",
        backgroundColor: $checked ? "blue" : "white",
        border: "1px solid blue",
        height: "16px",
        width: "16px",
        marginTop: "5px",
        borderRadius: "2px",
      }),
    },
  },
};
