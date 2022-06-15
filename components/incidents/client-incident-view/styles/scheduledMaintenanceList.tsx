// component prop type
import { BlockProps } from "baseui/block";

export const maintenanceListItem: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      },
    },
  },
};

export const maintenanceItemName: BlockProps = {
  overrides: {
    Block: {
      style: {
        flex: "100%",
        fontSize: "1.3rem",
        fontWeight: 500,
        textTransform: "capitalize",
        display: "inline",
      },
    },
  },
};
export const maintenanceItemDate: BlockProps = {
  overrides: {
    Block: {
      style: {
        color: "rgb(175, 175, 175)",
        fontSize: "0.875rem",
        margin: "5px 0px 0px 0px",
        whiteSpace: "nowrap",
      },
    },
  },
};

export const maintenanceItemStatusBody: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
        fontWeight: 400,
        marginBottom: "5px",
        display: "inline",
      },
    },
  },
};
export const maintenanceItemHeaderWrapper: BlockProps = {
  overrides: {
    Block: {
      style: () => ({
        display: "flex",
        flexDirection: "row",
        padding: "5px 0px",
        borderBottom: "0.1px grey solid",
        flexWrap: "nowrap",
      }),
    },
  },
};

export const maintenanceItemStatusStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
        fontWeight: 700,
        textTransform: "capitalize",
        display: "inline",
      },
    },
  },
};
