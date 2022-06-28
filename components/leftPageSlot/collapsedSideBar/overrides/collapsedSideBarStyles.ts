import { BlockProps } from "baseui/block";

export const collapsedSideBarStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        margin: "0px auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        color: "black",
        width: "90%",
        height: "100vh",
        top: 0,
        position: "sticky",
        boxShadow: " 0 1px 4px 0 rgba(10,10,20,0.15)",
      },
    },
  },
};
export const collapsedSideBarHeaderName: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "2.1rem",
        lineHeight: "2.125rem",
        fontWeight: 500,
        padding: "12px 20px",
        cursor: "pointer",
        borderRadius: "9999px",
        backgroundColor: "#EEEEF1",
        display: "inline",
        margin: " 10px auto",
        ":hover": {
          backgroundColor: "#DBDBDB",
        },
      },
    },
  },
};

export const collapsedSignOutButton: BlockProps = {
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
        padding: "8px 28px",
        borderRadius: "8px",
        alignSelf: "flex-start",
        margin: "auto auto 20px auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "black !important",
      },
    },
  },
};

export const collapsedUserDetailsWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        margin: "10px 8px 50px 8px",
        padding: "16px 0px",
        backgroundColor: "#EEEFF1",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "10px",
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
        textAlign: "center",
        backgroundColor: "#DBDBDB",
        borderRadius: "8px",
        textTransform: "uppercase",
        fontSize: "1.25rem",
      },
    },
  },
};

export const collapsedEmailWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "0.85rem",
        marginTop: "8px",
      },
    },
  },
};
export const collapsedSideBarHoverStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        padding: "8px",
        fontSize: "16px",
        borderRadius: "8px",
        backgroundColor: "#F8F8FA",
        zIndex: 10,
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
        margin: "20px auto",
        ":hover": {
          backgroundColor: "#DBDBDB",
        },
      },
    },
  },
};
