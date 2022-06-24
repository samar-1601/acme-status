import { BlockProps } from "baseui/block";

export const sideBarStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        margin: "0px auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgb(20,47,93)",
        color: "white",
        width: "100%",
        height: "100vh",
        top: 0,
        position: "sticky",
      },
    },
  },
};
export const sideBarHeaderName: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "2.5rem",
        lineHeight: "2.525rem",
        fontWeight: 500,
        background: "linear-gradient(rgba(0, 0, 0, 0.5), rgb(20,47,93))",
        color: "white",
        padding: "20px 0px 30px 0px",
        textAlign: "center",
      },
    },
  },
};
export const signOutButton: BlockProps = {
  overrides: {
    Block: {
      style: {
        padding: "4px 16px",
        margin: "auto auto 40px auto",
        width: "142px",
        height: "42px",
        textAlign: "center",
      },
    },
  },
};
