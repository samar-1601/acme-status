import { BlockProps } from "baseui/block";

export const pageContainer: BlockProps = {
  overrides: {
    Block: {
      style: {
        width: "65%",
        fontFamily:
          "'proxima-nova', 'Helvetica Neue', Helvetica, Arial, Sans-Serif",
        margin: "auto",
      },
    },
  },
};
export const homepageHeader: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "2.7rem",
        margin: "auto",
        fontWeight: 700,
        padding: "1rem 3rem",
        color: "rgb(51,51,51)",
      },
    },
  },
};
export const clientsCommonComponentsWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        margin: "2rem",
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "3rem 3rem",
        boxShadow: "0 0 20px #ccc",
      },
    },
  },
};

export const h1: BlockProps = {
  overrides: {
    Block: {
      style: {
        marginBottom: "2rem",
        fontWeight: 700,
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
        marginBottom: "3rem",
        fontWeight: 600,
        color: "rgb(51,51,51)",
        fontSize: "1.75rem",
        lineHeight: "2.3625rem",
      },
    },
  },
};
