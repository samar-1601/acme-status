// component prop type
import { BlockProps } from "baseui/block";

export const loginListView: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontFamily: "'Lato', sans-serif",
        margin: "30vh auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  },
};

export const loginListItem: BlockProps = {
  onMouseEnter: (event) => {
    if (event.target) {
      (event.currentTarget as HTMLElement).style.backgroundColor = "#F8F8FA";
    }
  },
  onMouseLeave: (event) => {
    if (event.target) {
      (event.currentTarget as HTMLElement).style.backgroundColor = "white";
    }
  },
  overrides: {
    Block: {
      style: {
        backgroundColor: "white",
        minWidth: "300px",
        border: "2px solid #E6E6E9",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "20px",
        margin: "10px",
        borderRadius: "8px",
      },
    },
  },
};

export const loginProviderName: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "1.2rem",
        fontWeight: 500,
        textTransform: "capitalize",
        display: "inline",
        padding: "0px 20px",
      },
    },
  },
};
