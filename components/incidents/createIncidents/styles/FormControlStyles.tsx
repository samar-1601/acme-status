import { FormControlOverrides } from "baseui/form-control";

export const inputStatusFormControlStyle: FormControlOverrides = {
  ControlContainer: {
    style: () => ({
      border: "2px solid #E2E2E2",
      backgroundColor: "white",
      borderRadius: "8px",
    }),
  },
};

export const messageFormControlStyle: FormControlOverrides = {
  ControlContainer: {
    style: () => ({
      backgroundColor: "white",
      borderRadius: "8px",
    }),
  },
};
