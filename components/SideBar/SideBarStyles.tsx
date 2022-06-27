import { BlockProps } from "baseui/block";

export const sideBarStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        margin: "0px auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        color: "black",
        width: "100%",
        height: "100vh",
        top: 0,
        position: "sticky",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
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
        // background: "linear-gradient(rgba(0, 0, 0, 0.5), rgb(20,47,93))",
        // color: "white",
        padding: "24px 0px",
        textAlign: "center",
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      },
    },
  },
};
export const signOutButton: BlockProps = {
  onMouseEnter: (event) => {
    if (event.target) {
      (event.currentTarget as HTMLElement).style.backgroundColor = "#F8F8FA";
    }
  },
  onMouseLeave: (event) => {
    if (event.target) {
      (event.currentTarget as HTMLElement).style.backgroundColor = "white";
    }
  },
  overrides: {
    Block: {
      style: {
        border: "1px solid #E6E6E9",
        cursor: "pointer",
        padding: "8px 36px",
        borderRadius: "8px",
        alignSelf: "flex-start",
        margin: "auto auto 40px auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        color: "black !important",
      },
    },
  },
};

export const userDetailsWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        margin: "10px 20px 50px 20px",
        padding: "12px",
        // backgroundColor: "rgb(16, 36 ,71)",
        backgroundColor: "#F8F8FA",
        borderRadius: "8px",
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
        // marginTop: "32px",
      },
    },
  },
};

export const userNameWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        marginTop: "15px",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        textTransform: "uppercase",
        fontSize: "1.25rem",
      },
    },
  },
};

export const emailWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "0.85rem",
        color: "lightslategrey",
      },
    },
  },
};
