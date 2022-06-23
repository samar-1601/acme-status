
// component prop type
import { BlockProps } from "baseui/block";

export const listItem: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        flexDirection: "column",
        border: "0.5px solid grey",
        gap: "10px",
        marginBottom : "30px",
        marginRight: "10px",
      },
    },
  },
};

export const itemName: BlockProps = {
  overrides: {
    Block: {
      style: {
        flex: "100%",
        fontSize: "1.3rem",
        fontWeight: 500,
        textTransform: "capitalize",
        backgroundColor: "rgb(51,51,51)",
        color: "white",
        padding: "15px 25px",
      },
    },
  },
};
export const itemDate: BlockProps = {
  overrides: {
    Block: {
      style: {
        color: "#AAAAAA",
        fontSize: "0.875rem",
        lineHeight: "1.334375rem",
        marginLeft : "25px",
        marginBottom : "25px",
      },
    },
  },
};

export const itemStatus: BlockProps = {
  overrides: {
    Block: {
      style: () => ({
        margin: "10px 0px 5px 25px",
      }),
    },
  },
};

export const hasListLoadedStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        marginTop: "55vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
};
