// props for Block component
import { BlockProps } from "baseui/block";
import { InputProps } from "baseui/input";

export const HEADER_CONTAINER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      top: "0ch",
      width: "80%",
      margin: "auto",
    },
  },
};

export const CONTENT_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      width: "100%",
      margin: "10px auto",
    },
  },
};

export const HEADER_BAR_LEFT_WRAPPER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "row",
      padding: "20px 0px",
      gap: "25px",
    },
  },
};

export const HEADER_BAR_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
    },
  },
};

export const BACK_ICON_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      cursor: "pointer",
      borderRadius: "60000px",
      backgroundColor: "#EEEEF1",
      padding: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ":hover": {
        backgroundColor: "#DBDBDB",
      },
    },
  },
};
export const NAVBAR_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "2px rgb(205, 203, 203) solid",
    },
  },
};
export const NAV_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: "10px",
      marginTop: "10px",
    },
  },
};
export const NAV_BAR_MENU_ITEM_WRAPPER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      marginRight: "20px",
      ":hover": {
        cursor: "pointer",
      },
    },
  },
};
export const CREATE_BUTTON_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      alignSelf: "flex-end",
      marginBottom: "8px",
      padding: "10px",
    },
  },
};

export const ACTIVE_NAV_ITEM_OVERRIDES = {
  borderBottom: "rgb(32, 65, 230) solid 2px",
  color: "rgb(32, 65, 230) !important",
  fontWeight: "600",
  paddingRight: "14px",
  paddingLeft: "14px",
  paddingBottom: "16px",
  textDecoration: "none",
  fontSize: "16px",
  display: "inline",
};

export const NON_ACTIVE_NAV_ITEM_OVERRIDES = {
  paddingRight: "14px",
  paddingLeft: "14px",
  paddingBottom: "16px",
  color: "rgb(82, 80, 80)",
  textDecoration: "none",
  fontSize: "16px",
  display: "inline",
  ":hover": {
    color: "rgb(106, 147, 197)",
  },
};

export const SEARCH_WRAPPER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      flexBasis: "50%",
    },
  },
};
export const SEARCH_HOVER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      padding: "8px 12px",
      fontSize: "14px",
      borderRadius: "8px",
      backgroundColor: "#F8F8FA",
      zIndex: 10,
    },
  },
};

export const SEARCH_OVERRIDES: InputProps["overrides"] = {
  Root: {
    style: ({ $isFocused }) => ({
      width: "100%",
      borderRadius: "8px !important",
      borderColor: $isFocused ? "#0E61F6" : "#E6E6E9",
      ":hover": {
        borderColor: "#0E61F6",
      },
      borderWidth: "1px",
    }),
  },
  InputContainer: {
    style: { backgroundColor: "white" },
  },
};

export const DISABLED_SEARCH_OVERRIDES: InputProps["overrides"] = {
  Root: {
    style: ({ $isFocused }) => ({
      borderRadius: "8px !important",
      borderColor: "#E6E6E9",
      borderWidth: "1px",
    }),
  },
  InputContainer: {
    style: { backgroundColor: "white" },
  },
};

export const REFRESH_BUTTON_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      padding: "12px",
      cursor: "pointer",
      borderRadius: "8px",
      backgroundColor: "white",
      display: "inline",
      ":hover": {
        backgroundColor: "#DBDBDB",
      },
    },
  },
};
