import { BlockProps } from "baseui/block";

export const incidentsListView: BlockProps = {
  overrides: {
    Block: {
      style: {
        width: "60%",
        fontFamily: "'Lato', sans-serif",
        margin: "auto",
      },
    },
  },
};

export const h1: BlockProps = {
  overrides: {
    Block: {
      style: {
        margin: "2rem 0rem 3rem 0rem",
        fontWeight: "700",
        color: "rgb(51,51,51)",
        fontSize: "30px",
      },
    },
  },
};
export const h3: BlockProps = {
  overrides: {
    Block: {
      style: {
        margin: "3rem 0rem 3rem 0rem",
        fontWeight: "600",
        color: "rgb(51,51,51)",
        fontSize: "1.75rem",
        lineHeight: "2.3625rem",
      },
    },
  },
};
