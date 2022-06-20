import { FormControlOverrides } from "baseui/form-control";

export const inputStatusFormControlStyle: FormControlOverrides = {
  ControlContainer: {
    style: ({ $theme, $isFocused }) => ({
      border: $isFocused ? "2px solid black" : "2px solid #E2E2E2",
      backgroundColor: $theme.colors.backgroundTertiary,
    }),
  },
};

export const messageFormControlStyle: FormControlOverrides = {
  ControlContainer: {
    style: ({ $isFocused }) => ({
      border: $isFocused ? "2px solid black" : "2px solid #E2E2E2",
    }),
  },
};
