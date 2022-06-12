
// component prop type
import { BlockProps } from "baseui/block";

export const maintenanceListItem: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom : "30px"
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
        fontWeight: "bold",
        textTransform: "capitalize",
        padding: "15px 0px",
        borderBottom : "0.1px grey solid"
      },
    },
  },
};
export const maintenanceItemDate: BlockProps = {
  overrides: {
    Block: {
      style: {
        color: "grey",
        fontSize: "0.9rem",
        marginBottom : "25px",
      },
    },
  },
};

export const maintenanceItemStatus: BlockProps = {
  overrides: {
    Block: {
      style: () => ({
        fontWeight: "bold",
        borderRadius: "4px",
        fontSize: "1rem",
        textTransform: "capitalize",
        color : "rgb(51,51,51)",
        marginTop : "10px",
      }),
    },
  },
};
