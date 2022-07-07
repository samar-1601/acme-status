// component prop type
import { BlockProps } from "baseui/block";

export const MAINTENANCE_LIST_ITEM_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      margin: "10px 15px 10px 0px",
    },
  },
};
export const MAINTENANCE_LIST_ITEM_LOADER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      margin: "10px 15px 19px 0px",
      maxWidth: "100%",
    },
  },
};

export const MAINTENANCE_ITEM_NAME_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      flex: "100%",
      fontSize: "1.3rem",
      fontWeight: 500,
      textTransform: "capitalize",
      display: "inline",
    },
  },
};
export const MAINTENANCE_ITEM_DATE_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      color: "rgb(175, 175, 175)",
      fontSize: "0.875rem",
      margin: "5px 0px 0px 0px",
      whiteSpace: "nowrap",
    },
  },
};

export const MAINTENANCE_ITEM_STATUS_BODY_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      fontSize: "1rem",
      lineHeight: "1.5rem",
      fontWeight: 400,
      marginBottom: "5px",
      display: "inline",
    },
  },
};
export const MAINTENANCE_ITEMHEADER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: () => ({
      display: "flex",
      flexDirection: "row",
      padding: "5px 0px",
      borderBottom: "0.1px grey solid",
      flexWrap: "nowrap",
    }),
  },
};

export const MAINTENANCE_ITEM_STATUS_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      fontSize: "1rem",
      lineHeight: "1.5rem",
      fontWeight: 700,
      textTransform: "capitalize",
      display: "inline",
    },
  },
};
