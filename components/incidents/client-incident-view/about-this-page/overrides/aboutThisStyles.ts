// component proptype
import { BlockProps } from "baseui/block";

// helper
import { componentsStatusColor } from "../helpers/helpers";

export const COMPONENT_LIST_WRAPPER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      borderTop: "0.5px solid grey",
      borderLeft: "0.5px solid grey",
      borderRight: "0.5px solid grey",
    },
  },
};
export const COMPONENT_DETAILS_WRAPPER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      borderBottom: "0.5px solid grey",
      padding: "30px 25px",
    },
  },
};
export const COMPONENT_DETAILS_WRAPPER_NO_BORDER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      padding: "30px 25px",
    },
  },
};
export const COMPONENT_GROUP_DETAILS_WRAPPER_OVERRIDES: BlockProps["overrides"] =
  {
    Block: {
      style: {
        borderBottom: "0.5px solid grey",
        padding: "30px 25px",
      },
    },
  };

export const COMPONENT_HEADER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
  },
};
export const COMPONENT_NAME_TEXT_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      fontSize: "1rem",
      lineHeight: "1.5rem",
      fontWeight: 500,
      textTransform: "capitalize",
    },
  },
};

export const COLORFUL_BAR_WRAPPER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      width: "100%",
      display: "flex",
      gap: "4px",
    },
  },
};

export const COLORFUL_BAR_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      width: "calc(100%/90)",
      height: "34px",
      margin: "12px 0px",
    },
  },
};
export const LEGEND_BOX_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      width: "18px",
      height: "18px",
      border: "1px solid rgba(0, 0, 0, .2)",
      borderRadius: "5px",
      margin: "0px 10px 0px 25px",
    },
  },
};
export const LEGEND_BOX_WRAPPER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      margin: "25px 0px",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1rem",
    },
  },
};
export const COMPONENT_TIMELINE_ROW_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "center",
      flexDirection: "row",
      color: "#aaa",
      fontSize: "14px",
    },
  },
};

export const HORIZONTAL_LINE_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      border: "0.5px solid rgb(211,211,211)",
      flexGrow: 1,
      margin: "0px 15px",
    },
  },
};

export const COMPONENT_STATUS_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: ($value) => ({
      color: componentsStatusColor($value.children).color,
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.5rem",
    }),
  },
};
