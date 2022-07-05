import { BlockProps } from "baseui/block";

export const PAGE_WRAPPER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
    },
  },
};

export const LEFT_CONTENT_OVERRIDES: BlockProps["overrides"] = {
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
};

export const RIGHT_CONTENT_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      width: "100%",
      margin: "0 auto",
    },
  },
};

export const COLLAPSED_LEFT_CONTENT_OVERRIDES: BlockProps["overrides"] = {
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
};
