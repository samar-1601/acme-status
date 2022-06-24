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
        display: "flex",
        gap:"10px",
        alignItems: "center",
        justifyContent: "center",
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

export const userDetailsWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        margin: "10px 20px 40px 20px",
        backgroundColor: "rgb(16, 36 ,71)",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
};

export const userImageWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        marginTop: "24px",
      },
    },
  },
};

export const userNameWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        margin: "25px auto",
        textAlign: "center",
        textTransform: "uppercase",
        fontSize: "1.25rem",
      },
    },
  },
};
