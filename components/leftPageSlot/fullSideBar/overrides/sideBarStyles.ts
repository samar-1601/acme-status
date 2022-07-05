import { BlockProps } from "baseui/block";

export const SIDE_BAR_STYLE_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      margin: "0px auto",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      color: "black",
      width: "100%",
      height: "100vh",
      top: 0,
      position: "sticky",
      boxShadow: " 0 1px 4px 0 rgba(10,10,20,0.15)",
    },
  },
};
export const SIDE_BAR_HEADER_NAME_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      fontSize: "2.5rem",
      lineHeight: "2.525rem",
      fontWeight: 700,
      padding: "24px 0px",
      marginLeft: "10px",
      cursor: "pointer",
      display: "inline",
    },
  },
};
export const SIDE_BAR_HEADER_WRAPPER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "0px 20px",
    },
  },
};
export const SIGN_OUT_BUTTON_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      border: "1px solid #E6E6E9",
      cursor: "pointer",
      padding: "8px 36px",
      borderRadius: "8px",
      alignSelf: "flex-start",
      margin: "auto auto 40px auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      color: "black !important",
      backgroundColor: "white",
      ":hover": {
        backgroundColor: "#F8F8FA",
      },
    },
  },
};

export const USER_DETAILS_WRAPPER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      margin: "10px 20px 50px 20px",
      padding: "12px",
      // backgroundColor: "rgb(16, 36 ,71)",
      backgroundColor: "#EEEFF1",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
};

export const USER_NAME_WRAPPER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      marginTop: "15px",
      marginLeft: "auto",
      marginRight: "auto",
      textAlign: "center",
      textTransform: "uppercase",
      fontSize: "1.25rem",
    },
  },
};

export const EMAIL_WRAPPER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      fontSize: "0.85rem",
      color: "lightslategrey",
    },
  },
};

export const SIDE_BAR_COLLAPSE_ICON_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      cursor: "pointer",
      display:"float",
      position: "absolute",
      left: '299px',
      top: "180px",
      borderRadius: "60000px",
      boxShadow: " 0 1px 4px 0 rgba(10,10,20,0.15)",
      backgroundColor: "white",
      padding: "4px",
      ":hover": {
        backgroundColor: "#DBDBDB",
      },
    },
  },
};
