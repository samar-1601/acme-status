import { BlockProps } from "baseui/block";

export const pageWrapperStyles: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        width: "100%",
      },
    },
  },
};

export const leftNavBarStyles: BlockProps = {
  overrides: {
    Block: {
      style: {
        width: "20%",
        display: "flex",
        justifyContent: "flex-end",
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
