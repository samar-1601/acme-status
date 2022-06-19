import { ButtonProps } from "baseui/button";

export const cancelButtonStyle: ButtonProps = {
  overrides: {
    BaseButton: {
      style: ({ $theme }) => ({
        backgroundColor: $theme.colors.accent,
        width: "80px",
        alignSelf: "end",
        marginRight: "50px",
      }),
    },
  },
};

export const submitButtonStyle: ButtonProps = {
  overrides: {
    BaseButton: {
      style: ({ $theme }) => ({
        backgroundColor: $theme.colors.accent,
        width: "80px",
        alignSelf: "end",
      }),
    },
  },
};

export const onSubmitButtonStyle: ButtonProps = {
  overrides: {
    BaseButton: {
      style: ({ $theme }) => ({
        backgroundColor: $theme.colors.accent,
        width: "80px",
        alignSelf: "end",
        cursor: "not-allowed",
      }),
    },
  },
};
