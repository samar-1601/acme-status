// contstants
import { ComponentStatusType } from "../../../../constants";

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
        fontSize: "18px",
        fontWeight: "900",
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
export const colorfullBar: BlockProps = {
  overrides: {
    Block: {
      style: {
        width: "calc(100%/90)",
        height: "42px",
        backgroundColor: "rgb(211,211,211)",
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
        color: "grey",
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
        flexGrow: "1",
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
        color: "rgb(0,154,23)",
        content : "Operational",
      };
    case ComponentStatusType.DegradedPerformance:
      //yellow
      return {
        color: "rgb(246,190,0)",
        content : "Degraded Performance"
      };
    case ComponentStatusType.MajorOutage:
      // red
      return {
        color: "rgb(205,0,26)",
      };
    case ComponentStatusType.PartialOutage:
      // orange
      return {
        color: "rgb(255,153,19)",
      };
    case ComponentStatusType.UnderMaintenance:
      // pink
      return {
        color: "pink",
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
        content : componentsStatusColor($value.children).content,
        textTransform: "capitalize",
        fontSize: "17px",
        fontWeight: "700",
      }),
    },
  },
};
