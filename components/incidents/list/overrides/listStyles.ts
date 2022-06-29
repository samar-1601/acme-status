// component prop type
import { BlockProps } from "baseui/block";

// helpers
import { statusLabelColorDecider } from "../helpers/statusColorDecider";

export const LIST_ITEM_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "20px 30px 15px 30px",
      backgroundColor: "white",
      margin: "10px auto 20px auto",
      width: "80%",
      borderTop: "4px rgb(243, 214, 54) solid",
      borderRadius: "8px",
      boxShadow:
        "0 0px 1px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19)",
      listStyle: "none",
      flexDirection: "column",
    },
  },
};

export const INCIDENT_LIST_VIEW_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      width: "100%",
      overflowX: "hidden",
    },
  },
};

export const ITEM_DETAILS_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      gap: "6px",
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%",
    },
  },
};

export const ITEM_DETAILS_FIRST_TWO_LINES_WRAPPER_OVERRIDES: BlockProps["overrides"] =
  {
    Block: {
      style: {
        display: "flex",
        gap: "6px",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
      },
    },
  };

export const ITEM_FIRST_PART_LEFT_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      gap: "6px",
      flexDirection: "column",
    },
  },
};

export const ITEM_NAME_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      // flex: "100%",
      fontSize: "1.2rem",
      fontWeight: 900,
      marginBottom: "6px",
      textTransform: "capitalize",
      display: "flex",
      justifyContent: "space-between",
    },
  },
};

export const ITEM_DATE_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      color: "grey",
      marginLeft: "10px",
      fontSize: "0.8rem",
      display: "inline",
    },
  },
};

export const COMPONENT_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: ($value) => ({
      marginTop: "12px",
      display: "inline",
      paddingBottom: "8px",
    }),
  },
};

export const COMPONENT_ICON_HOVER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      padding: "8px",
      fontSize: "14px",
      borderRadius: "8px",
      backgroundColor: "#F8F8FA",
    },
  },
};

export const ITEM_DETAILS_SECOND_LINE_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "inline",
    },
  },
};

export const COMPONENT_ITEM_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      paddingRight: "1.2rem",
      paddingTop: "2px",
      display: "inline",
      alignContent: "center",
      alignItems: "center",
    },
  },
};

export const COMPONENT_ITEM_ICON_WRAPPER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      marginRight: "10px",
      display: "inline",
    },
  },
};

export const LOADER_OVERRIDES: BlockProps["overrides"] = {
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

export const ITEM_STATUS: BlockProps["overrides"] = {
  Block: {
    style: ($value) => ({
      backgroundColor: statusLabelColorDecider($value.children).backgroundColor,
      color: statusLabelColorDecider($value.children).color,
      padding: "2px 4px",
      borderRadius: "4px",
      fontSize: "0.8rem",
      letterSpacing: "0.08ch",
      textTransform: "uppercase",
      fontWeight: 600,
      display: "inline",
    }),
  },
};

export const EDIT_INCIDENT_BUTTON_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      padding: "4px",
      display: "inline",
      cursor: "pointer",
      ":hover": {
        color: "#808080",
      },
    },
  },
};

export const BUTTON_AREA: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      gap: "16px",
    },
  },
};
