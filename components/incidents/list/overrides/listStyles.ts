// constants
import { StatusType } from "../../../../constants";

// component prop type
import { BlockProps } from "baseui/block";

export const listItem: BlockProps = {
  overrides: {
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
  },
};
export const incidentsListView: BlockProps = {
  overrides: {
    Block: {
      style: {
        width: "100%",
        overflowX: "hidden",
      },
    },
  },
};

export const listDetails: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        gap: "6px",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
      },
    },
  },
};
export const listDetailsFirstTwoLines: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        gap: "6px",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
      },
    },
  },
};
export const listFirstPartLeft: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        gap: "6px",
        flexDirection: "column",
      },
    },
  },
};
export const itemName: BlockProps = {
  overrides: {
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
  },
};
export const itemDate: BlockProps = {
  overrides: {
    Block: {
      style: {
        color: "grey",
        marginLeft: "10px",
        fontSize: "0.8rem",
        display: "inline",
      },
    },
  },
};
export const component: BlockProps = {
  overrides: {
    Block: {
      style: ($value) => ({
        marginTop: "12px",
        display: "inline",
        paddingBottom: "8px",
      }),
    },
  },
};
export const componentIconHoverTextStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        padding: "8px",
        fontSize: "14px",
        borderRadius: "8px",
        backgroundColor: "#F8F8FA",
      },
    },
  },
};
export const itemDetailsSecondLine: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "inline",
      },
    },
  },
};

export const componentItem: BlockProps = {
  overrides: {
    Block: {
      style: {
        paddingRight: "1.2rem",
        paddingTop: "2px",
        display: "inline",
        alignContent: "center",
        alignItems: "center",
      },
    },
  },
};
export const componentItemIconWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        marginRight: "10px",
        display: "inline",
      },
    },
  },
};
export const hasListLoadedStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        width: "100%",
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
const statusColor = (status: string) => {
  status = status.toLowerCase();
  switch (status) {
    case StatusType.Investigating:
      return {
        //bgBlue
        backgroundColor: "rgb(191, 214, 231)",
        color: "rgb(32, 32, 212)",
      };
    case StatusType.Resolved:
      //bgGreen
      return {
        backgroundColor: "rgb(195, 225, 199)",
        color: "gb(59, 136, 49)",
      };
    case StatusType.Verifying:
      // bgYellow
      return {
        backgroundColor: "rgb(233, 236, 139)",
        color: "rgb(184, 157, 20)",
      };
    case StatusType.Completed:
      // bgPink
      return {
        backgroundColor: "rgb(236, 209, 230)",
        color: "rgb(174, 68, 160)",
      };
    case StatusType.Scheduled:
      // bgOrange
      return {
        backgroundColor: "rgb(233, 224, 191)",
        color: "rgb(194, 139, 50)",
      };
    case StatusType.InProgress:
      // bgGreyBlue
      return {
        backgroundColor: "rgb(184, 223, 222)",
        color: "rgb(54, 115, 165)",
      };
    default:
      return {
        backgroundColor: "grey",
        color: "black",
      };
  }
};

export const itemStatus: BlockProps = {
  overrides: {
    Block: {
      style: ($value) => ({
        backgroundColor: statusColor($value.children).backgroundColor,
        color: statusColor($value.children).color,
        padding: "2px 4px",
        borderRadius: "4px",
        fontSize: "0.8rem",
        letterSpacing: "0.08ch",
        textTransform: "uppercase",
        fontWeight: 600,
        display: "inline",
      }),
    },
  },
};

export const editIncidentButton: BlockProps = {
  overrides: {
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
  },
};
export const buttonArea: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        gap: "16px",
      },
    },
  },
};