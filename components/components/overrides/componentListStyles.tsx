import { BlockProps } from "baseui/block";

export const DETAIL_STYLES: BlockProps["overrides"] = {
  Block: {
    style: {
      fontSize: "14px",
      color: "#808080",
      paddingTop: "10px",
    },
  },
};

export const CONTENT: BlockProps["overrides"] = {
  Block: {
    style: {
      position: "relative",
      margin: "10px 0px",
    },
  },
};

export const CREATE_COMPONENT_BUTTON: BlockProps["overrides"] = {
  Block: {
    style: {
      alignSelf: "flex-end",
      marginBottom: "8px",
      padding: "10px",
    },
  },
};

export const navActiveItem = {
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

export const navNonActiveItem = {
  paddingRight: "14px",
  paddingLeft: "14px",
  paddingBottom: "16px",
  color: "rgb(82, 80, 80)",
  textDecoration: "none",
  fontSize: "16px",
  display: "inline",
};

export const spanInsideNav: BlockProps = {
  onMouseEnter: (event) => {
    if (event.target) {
      (event.target as HTMLElement).style.color = "rgb(106, 147, 197)";
    }
  },
  onMouseLeave: (event) => {
    if (event.target) {
      (event.target as HTMLElement).style.color = "";
    }
  },
};

export const DIV_INSIDE_NAV: BlockProps["overrides"] = {
  Block: {
    style: {
      cursor: "pointer",
      marginRight: "20px",
      fontSize: "14px",
    },
  },
};

export const DIV_INSIDE_NAV_DISABLED: BlockProps = {
  overrides: {
    Block: {
      style: {
        cursor: "not-allowed",
        marginRight: "20px",
        fontSize: "14px",
      },
    },
  }
};

export const NAV: BlockProps["overrides"] = {
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

export const NAV_BAR_WRAPPER: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "2px rgb(205, 203, 203) solid",
    },
  },
};

export const CONTAINER: BlockProps["overrides"] = {
  Block: {
    style: {
      top: "0ch",
      width: "80%",
      margin: "auto",
      position: "sticky",
      zIndex: 10,
      backgroundColor: "#EEEFF1",
    },
  },
};

export const COMPONENTS_LIST_VIEW: BlockProps["overrides"] = {
  Block: {
    style: {
      width: "100%",
    },
  },
};

export const HEADER_BAR_BACK_ICON: BlockProps["overrides"] = {
  Block: {
    style: {
      marginRight: "15px",
      cursor: "pointer",
    },
  },
};

export const HEADER: BlockProps["overrides"] = {
  Block: {
    style: {
      padding: "20px",
      fontSize: "20px",
      display: "flex",
      justifyContent: "space-between",
    },
  },
};

export const HEADING: BlockProps["overrides"] = {
  Block: {
    style: {
      paddingTop: "5px",
      fontSize: "24px",
      fontWeight: 400,
      display: "flex",
    },
  },
};

export const LIST_ITEM: BlockProps["overrides"] = {
  Block: {
    style: {
      fontSize: "16px",
      display: "flex",
    },
  },
};

export const COMPONENTS_BUTTON_AREA: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      gap: "16px",
      marginLeft: "auto",
    },
  },
};

export const ELEMENT: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "white",
      padding: "16px",
      margin: "10px auto 20px auto",
      boxShadow:
        "0 0px 1px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19)",
      width: "78%",
      borderRadius: "8px",
      listStyle: "none",
    },
  },
};

export const ELEMENT_LOADER: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "white",
      padding: "16px",
      margin: "10px auto 20px auto",
      boxShadow:
        "0 0px 1px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19)",
      width: "78%",
      borderRadius: "8px",
      listStyle: "none",
    },
  },
}

export const LOADER: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
      width: "100%",
    },
  },
};

export const PAGE: BlockProps["overrides"] = {
  Block: {
    style: {
      width: "80%",
      margin: "auto",
      backgroundColor: "#F8F8FA",
    },
  },
};

