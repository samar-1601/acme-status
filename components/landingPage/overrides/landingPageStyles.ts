import { BlockProps } from "baseui/block";

export const LANDING_PAGE_CONTAINER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      margin: "4rem auto",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      gap: "28px",
      width: "80%",
      justifyContent: "space-between",
      borderRadius: "8px",
      backgroundColor: "white",
      alignItems: "center",
    },
  },
};
export const LANDING_PAGE_HEADER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      fontSize: "2rem",
      fontWeight: 300,
      textAlign: "center",
    },
  },
};
export const LANDING_PAGE_DESCRIPTION_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      fontSize: "1.1rem",
      fontWeight: 300,
      textAlign: "center",
    },
  },
};
