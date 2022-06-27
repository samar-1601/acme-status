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
        minWidth: "360px",
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
        margin: "auto",
        padding: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: " 0 1px 4px 0 rgba(10,10,20,0.15)",
        zIndex: "10",
        cursor: "pointer",
      },
    },
  },
};

export const leftNavBarStylesHidden: BlockProps = {
  overrides: {
    Block: {
      style: {
        width: "0px",
        visibility: "hidden",
        minHeight: "100vh",
        zIndex: 10,
      },
    },
  },
};
