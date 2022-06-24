import { InputProps } from "baseui/input";

export const inputNameStyle: InputProps = {
  overrides: {
    Root: {
      style: ({ $isFocused }) => ({
        borderRadius: "8px !important",
        borderColor: $isFocused ? "#0E61F6" : "#E6E6E9",
        ":hover": {
          borderColor: "#0E61F6",
        },
        borderWidth: "1px",
      }),
    },
    InputContainer: {
      style: { backgroundColor: "white" },
    },
  },
};
