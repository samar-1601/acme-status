import { ButtonProps } from "baseui/button";

export const cancelButtonStyle: ButtonProps = {
  overrides: {
    BaseButton: {
      style: () => ({
        backgroundColor: "white",
        width: "92px",
        height: "34px",
        alignSelf: "end",
        marginRight: "16px",
        borderRadius: "8px",
        color: "black",
        border: "2px solid #E6E6E9",
      }),
      props: {
        onMouseEnter: (event: Event) => {
          if (event.target) {
            (event.target as HTMLElement).style.backgroundColor = "#F8F8FA";
          }
        },
        onMouseLeave: (event: Event) => {
          if (event.target) {
            (event.target as HTMLElement).style.backgroundColor = "white";
          }
        },
      },
    },
  },
};

export const submitButtonStyle: ButtonProps = {
  overrides: {
    BaseButton: {
      style: () => ({
        backgroundColor: "#0E61F6",
        width: "92px",
        alignSelf: "end",
        height: "34px",
        borderRadius: "8px",
        border: "2px solid #E6E6E9",
      }),
      props: {
        onMouseEnter: (event: Event) => {
          if (event.target) {
            (event.target as HTMLElement).style.backgroundColor = "#1858CE";
          }
        },
        onMouseLeave: (event: Event) => {
          if (event.target) {
            (event.target as HTMLElement).style.backgroundColor = "#0E61F6";
          }
        },
      },
    },
  },
};

export const onSubmitButtonStyle: ButtonProps = {
  overrides: {
    BaseButton: {
      style: () => ({
        backgroundColor: "#0E61F6",
        width: "92px",
        alignSelf: "end",
        height: "34px",
        borderRadius: "8px",
        cursor: "not-allowed",
        border: "2px solid #E6E6E9",
      }),
      props: {
        onMouseEnter: (event: Event) => {
          if (event.target) {
            (event.target as HTMLElement).style.backgroundColor = "#1858CE";
          }
        },
        onMouseLeave: (event: Event) => {
          if (event.target) {
            (event.target as HTMLElement).style.backgroundColor = "#0E61F6";
          }
        },
      },
    },
  },
};
