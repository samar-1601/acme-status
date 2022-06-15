// contstants
import { ComponentStatusType } from "../../../../../constants";

// component proptype
import { BlockProps } from "baseui/block";

export const componentListWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        borderTop: "0.5px solid grey",
        borderLeft: "0.5px solid grey",
        borderRight: "0.5px solid grey",
      },
    },
  },
};
export const componentDetailsWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        borderBottom: "0.5px solid grey",
        padding: "30px 25px",
      },
    },
  },
};

export const componentHeader: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      },
    },
  },
};
export const componentNameText: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
        fontWeight: 500,
      },
    },
  },
};

export const colorfullBarWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        width: "100%",
        display: "flex",
        gap: "4px",
      },
    },
  },
};

const barColorDeterminer = (value: number) => {
  if (value < 20) return "rgb(179, 186, 197)"; // grey
  if (value < 50) return "#2fcc66"; //green
  if (value < 55) return "#f1c40f"; // yellow

  return "#e74c3c"; // red
};

export const colorfullBar: BlockProps = {
  overrides: {
    Block: {
      style: {
        width: "calc(100%/90)",
        height: "34px",
        margin: "12px 0px",
      },
    },
  },
};
export const componentTimelineRow: BlockProps = {
  overrides: {
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
  },
};

export const horizontalLine: BlockProps = {
  overrides: {
    Block: {
      style: {
        border: "0.5px solid rgb(211,211,211)",
        width: "1px",
        flexGrow: 1,
        margin: "0px 15px",
      },
    },
  },
};

/**
 * Status' style
 * @param { string } status Status's name obtained in API response
 * @returns { string } The style for the status in list-view
 * @global
 */
const componentsStatusColor = (status: string) => {
  status = status.toLowerCase();
  switch (status) {
    case ComponentStatusType.Operational:
      return {
        //green
        color: "#2fcc66",
      };
    case ComponentStatusType.DegradedPerformance:
      //yellow
      return {
        color: "#f1c40f",
      };
    case ComponentStatusType.MajorOutage:
      // red
      return {
        color: "#e74c3c",
      };
    case ComponentStatusType.PartialOutage:
      // orange
      return {
        color: "#e67e22",
      };
    case ComponentStatusType.UnderMaintenance:
      // pink
      return {
        color: "#3498DB",
      };
    default:
      return {
        color: "black",
      };
  }
};

export const componentStatus: BlockProps = {
  overrides: {
    Block: {
      style: ($value) => ({
        color: componentsStatusColor($value.children).color,
        textTransform: "capitalize",
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: "1.5rem",
      }),
    },
  },
};
