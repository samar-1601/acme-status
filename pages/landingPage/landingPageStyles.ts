import { BlockProps } from "baseui/block";

export const landingPageContainerStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        margin: "4rem auto",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap:"28px",
        width: "80%",
        justifyContent: "space-between",
        borderRadius: "8px",
        backgroundColor: "white",
        alignItems: "center",
      },
    },
  },
};
export const landingPageHeaderStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "2rem",
        fontWeight: 300,
        textAlign: "center",
      },
    },
  },
};
export const landingPageDescriptionStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "1.1rem",
        fontWeight: 300,
        textAlign: "center",
      },
    },
  },
};