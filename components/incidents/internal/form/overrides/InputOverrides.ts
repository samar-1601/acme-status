import { InputProps } from "baseui/input";

export const INPUT_NAME_OVERRIDES: InputProps["overrides"] = {
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
};
export const DISABLED_INPUT_NAME_OVERRIDES: InputProps["overrides"] = {
  Root: {
    style: ({ $isFocused }) => ({
      borderRadius: "8px !important",
      borderColor: "#E6E6E9",
      borderWidth: "1px",
    }),
  },
  InputContainer: {
    style: { backgroundColor: "white" },
  },
};
