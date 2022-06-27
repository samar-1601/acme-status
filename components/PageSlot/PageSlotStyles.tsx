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
        width: "337.5px",
        display: "flex",
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
