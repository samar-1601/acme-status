// component prop type
import { BlockProps } from "baseui/block";

export const loginListView: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontFamily: "'Lato', sans-serif",
        margin: "0px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  },
};
export const loginPageWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        margin: "16vh auto",
        padding: "28px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        backgroundColor: "white",
        width: "70%",
        borderRadius: "8px",
      },
    },
  },
};
export const loginPageHeaderName: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "1.5rem",
        lineHeight: "1.525rem",
        fontWeight: 300,
        color: "black",
        textAlign: "center",
        marginBottom: "50px",
      },
    },
  },
};

export const loginPageDividerLine: BlockProps = {
  overrides: {
    Block: {
      style: {
        width: "0.1px",
        backgroundColor: "black",
        height: "325px",
        margin: "20px",
      },
    },
  },
};

export const loginListItem: BlockProps = {
  onMouseEnter: (event) => {
    if (event.target) {
      (event.currentTarget as HTMLElement).style.backgroundColor = "#1858CE";
    }
  },
  onMouseLeave: (event) => {
    if (event.target) {
      (event.currentTarget as HTMLElement).style.backgroundColor =
        "rgb(14,97,246)";
    }
  },
  overrides: {
    Block: {
      style: {
        backgroundColor: "rgb(14,97,246)",
        minWidth: "300px",
        border: "1px solid #E6E6E9",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "16px",
        margin: "10px",
        borderRadius: "8px",
        color: "white",
      },
    },
  },
};

export const loginProviderName: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "1.1rem",
        fontWeight: 500,
        textTransform: "capitalize",
        display: "inline",
        padding: "0px 20px",
      },
    },
  },
};
