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
      }),
    },
  },
};
