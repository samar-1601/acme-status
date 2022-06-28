import { BlockProps } from "baseui/block";

export const pageWrapperStyles: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      },
    },
  },
};

export const leftNavBarStyles: BlockProps = {
  overrides: {
    Block: {
      style: {
        minWidth: "310px",
        display: "flex",
        minHeight: "100vh",
        zIndex: 10,
        margin: "0px",
        padding: "0px",
      },
    },
  },
};

export const rightContentStyles: BlockProps = {
  overrides: {
    Block: {
      style: {
        width: "100%",
        margin: "0 auto",
      },
    },
  },
};

export const constantPaneStyles: BlockProps = {
  overrides: {
    Block: {
      style: {
        minWidth: "48px",
        backgroundColor: "white",
        height: "100vh",
        margin: "0 auto",
        padding: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: " 0 1px 4px 0 rgba(10,10,20,0.15)",
        zIndex: 20,
        cursor: "pointer",
        ":hover": {
          boxShadow: " 0 2px 8px 0 rgba(0,0,0,0.20)",
        },
        top: 0,
        position: "sticky",
      },
    },
  },
};

export const leftNavBarStylesCollapsed: BlockProps = {
  overrides: {
    Block: {
      style: {
        width: "100px",
        minHeight: "100vh",
        zIndex: 10,
        display: "flex",
        margin: "0px ",
        padding: "0px",
      },
    },
  },
};
