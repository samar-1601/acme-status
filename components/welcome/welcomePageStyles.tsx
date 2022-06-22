// component prop type
import { BlockProps } from "baseui/block";

export const incidentsListView: BlockProps = {
  overrides: {
    Block: {
      style: {
        width: "80%",
        fontFamily: "'Lato', sans-serif",
        margin: "auto",
      },
    },
  },
};

export const signOutButton: BlockProps = {
  onMouseEnter: (event) => {
    if (event.target) {
      (event.target as HTMLElement).style.backgroundColor = "#F8F8FA";
    }
  },
  onMouseLeave: (event) => {
    if (event.target) {
      (event.target as HTMLElement).style.backgroundColor = "white";
    }
  },
  overrides: {
    Block: {
      style: {
        borderRadius: "4px",
        padding: "10px 25px",
        backgroundColor: "white",
        border: "1px solid #E6E6E9",
        cursor: "pointer",
        display: "inline",
      },
    },
  },
};