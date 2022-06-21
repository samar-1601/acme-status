import { InputProps } from "baseui/input";

const name = ".hover";

export const inputNameStyle: InputProps = {
  overrides: {
    Root: {
      style: ({ $isFocused }) => ({
        borderRadius: "8px",
        borderColor: $isFocused ? "#0E61F6" : "#E6E6E9",
        ":hover": {
          borderColor: "#0E61F6",
        },
      }),
    },
    InputContainer: {
      style: { backgroundColor: "white" },
    },
  },
};
