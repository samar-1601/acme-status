import { SelectProps } from "baseui/select";

export const SELECT_OPTION_OVERRIDES: SelectProps["overrides"] = {
  DropdownOption: {
    style: ({ $theme }) => ({
      outline: `${$theme.colors.warning200} solid`,
      backgroundColor: $theme.colors.warning200,
    }),
  },
  Root: {
    style: {
      width: "300px",
      borderRadius: "8px",
    },
  },
  ControlContainer: {
    style: ({ $isFocused }) => ({
      backgroundColor: "white",
      borderRadius: "8px",
      borderColor: $isFocused ? "blue" : "#E6E6E9",
      borderWidth: "1px",
    }),
  },
};
