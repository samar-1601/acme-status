import { InputProps } from "baseui/input";

export const inputBorder: InputProps = {
  overrides: {
    Root: {
      style: ({ $theme, $isFocused }) => ({
        borderLeftColor: $isFocused
          ? $theme.colors.borderSelected
          : $theme.colors.borderOpaque,
        borderRightColor: $isFocused
          ? $theme.colors.borderSelected
          : $theme.colors.borderOpaque,
        borderTopColor: $isFocused
          ? $theme.colors.borderSelected
          : $theme.colors.borderOpaque,
        borderBottomColor: $isFocused
          ? $theme.colors.borderSelected
          : $theme.colors.borderOpaque,
      }),
    },
  },
};
