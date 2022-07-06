import { BlockProps } from "baseui/block";

export const COLLAPSED_SIDE_BAR_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      margin: "0px",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      color: "black",
      width: "90%",
      height: "100vh",
      top: 0,
      position: "sticky",
      boxShadow: " 0 1px 4px 0 rgba(10,10,20,0.15)",
    },
  },
};
export const COLLAPSED_SIDE_BAR_HEADER_NAME_OVERRIDES: BlockProps["overrides"] =
  {
    Block: {
      style: {
        fontSize: "2.1rem",
        lineHeight: "2.125rem",
        fontWeight: 700,
        padding: "14px 20px",
        cursor: "pointer",
        borderRadius: "9999px",
        backgroundColor: "#EEEEF1",
        display: "inline",
        margin: " 12px auto",
        ":hover": {
          backgroundColor: "#DBDBDB",
        },
      },
    },
  };

export const COLLAPSED_SIGN_OUT_BUTTON_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      border: "1px solid #E6E6E9",
      cursor: "pointer",
      padding: "8px 28px",
      borderRadius: "8px",
      backgroundColor: "white",
      alignSelf: "flex-start",
      margin: "auto auto 20px auto",
      color: "black !important",
      ":hover": {
        backgroundColor: "#F8F8FA",
      },
    },
  },
};

export const COLLAPSED_USER_DETAILS_WRAPPER_OVERRIDES: BlockProps["overrides"] =
  {
    Block: {
      style: {
        margin: "64px 8px 38px 8px",
        padding: "16px 0px",
        backgroundColor: "#EEEFF1",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      },
    },
  };

export const COLLAPSED_USER_NAME_WRAPPER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      textAlign: "center",
      backgroundColor: "#DBDBDB",
      borderRadius: "8px",
      textTransform: "uppercase",
      fontSize: "1.25rem",
    },
  },
};

export const COLLAPSED_EMAIL_WRAPPER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      fontSize: "0.85rem",
      marginTop: "8px",
    },
  },
};
export const COLLAPSED_SIDE_BAR_HOVER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      padding: "8px",
      fontSize: "16px",
      borderRadius: "8px",
      backgroundColor: "#F8F8FA",
      zIndex: 10,
    },
  },
};

export const SIDE_BAR_COLLAPSE_ICON_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      cursor: "pointer",
      // display: "float",
      position:"absolute",
      top:"180px",
      left:"74px",
      borderRadius: "60000px",
      backgroundColor: "white",
      boxShadow: " 0 1px 4px 0 rgba(10,10,20,0.15)",
      padding: "4px",
      // margin: "20px auto",
      ":hover": {
        backgroundColor: "#DBDBDB",
      },
    },
  },
};

export const COLLAPSE_SIDE_BAR_MENU_LIST_OVERRIDES: BlockProps['overrides'] = {
  Block:{
    style:{
      paddingTop:'68px'
    }
  }
}
