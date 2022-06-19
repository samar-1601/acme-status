import { SelectProps } from "baseui/select";

export const selectOptionStyle: SelectProps = {
  overrides: {
    DropdownOption: {
      style: ({ $theme }) => ({
        outline: `${$theme.colors.warning200} solid`,
        backgroundColor: $theme.colors.warning200,
      }),
    },
    Root: {
      style: {
        width: "300px",
      },
    },
  },
};
