// component prop type
import { BlockProps } from "baseui/block";

export const PAST_INCIDENT_HOVER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      fontSize: "1.25rem",
      lineHeight: "1.8125rem",
      fontWeight: 500,
      paddingBottom: "10px",
      borderBottom: "0.1px grey solid",
    },
  },
};

export const PAST_INCIDENT_NAME_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      fontSize: "1.25rem",
      lineHeight: "1.8125rem",
      fontWeight: 500,
      display: "list-item",
      marginLeft: "1rem",
      textTransform: "capitalize",
    },
  },
};
export const PAST_INCIDENT_STATUS_OVERRIDES: BlockProps["overrides"] = {
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
export const PAST_INCIDENT_STATUS_BODY_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      fontSize: "1rem",
      lineHeight: "1.5rem",
      fontWeight: 400,
      display: "inline",
    },
  },
};
export const PAST_INCIDENT_WRAPPER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      margin: "25px 0",
    },
  },
};

export const PAST_INCIDENT_STATUS_DATE_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      color: "rgb(175, 175, 175)",
      fontSize: "0.875rem",
      lineHeight: "1.334375rem",
      marginTop: "2px",
    },
  },
};

export const PAST_INCIDENT_DETAILS_WRAPPER_OVERRIDES: BlockProps["overrides"] =
  {
    Block: {
      style: {
        margin: "15px 0px 15px 2rem",
      },
    },
  };
