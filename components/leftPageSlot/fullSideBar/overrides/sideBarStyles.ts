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
        boxShadow: " 0 1px 4px 0 rgba(10,10,20,0.15)",
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
        padding: "24px 0px",
        marginLeft: "10px",
        cursor: "pointer",
        display: "inline",
      },
    },
  },
};
export const sideBarHeaderWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "0px 20px",
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
        backgroundColor: "#EEEFF1",
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

export const sideBarCollapseIcon: BlockProps = {
  overrides: {
    Block: {
      style: {
        cursor: "pointer",
        borderRadius: "60000px",
        backgroundColor: "#EEEEF1",
        padding: "8px",
        display: "inline",
        ":hover": {
          backgroundColor: "#DBDBDB",
        },
      },
    },
  },
};
