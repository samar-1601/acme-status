import { FormControlOverrides } from "baseui/form-control";

export const inputStatusFormControlStyle: FormControlOverrides = {
  ControlContainer: {
    style: () => ({
      border: "2px solid #E2E2E2",
      backgroundColor: "white",
      borderRadius: "8px",
    }),
    props: {
      onMouseEnter: (event: Event) => {
        (event.currentTarget as HTMLElement).style.border = "2px solid #0E61F6";
      },
      onMouseLeave: (event: Event) => {
        (event.currentTarget as HTMLElement).style.border = "2px solid #E2E2E2";
      },
    },
  },
};
