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
        width: "325px",
        display: "flex",
        backgroundColor: "rgb(20,47,93)",
        minHeight: "100vh",
        zIndex: 10,
      },
    },
  },
};

export const rightContentStyles: BlockProps = {
  overrides: {
    Block: {
      style: {
        width: "80%",
      },
    },
  },
};
