import { BlockProps } from "baseui/block";
import Router from "next/router";

export const container: BlockProps = {
  overrides: {
    Block: {
      style: {
        top: "0ch",
        width: "80%",
        margin: "auto",
      },
    },
  },
};

export const content: BlockProps = {
  overrides: {
    Block: {
      style: {
        width: "100%",
        margin: "10px auto",
      },
    },
  },
};
export const headerBarLeftWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        padding: "20px 0px",
        gap: "25px",
      },
    },
  },
};
export const headerBar: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      },
    },
  },
};

export const headerBarBackIcon: BlockProps = {
  onClick: () => {
    Router.push("/");
  },
  overrides: {
    Block: {
      style: {
        cursor: "pointer",
        borderRadius: "60000px",
        backgroundColor: "#EEEEF1",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ":hover": {
          backgroundColor: "#DBDBDB",
        },
      },
    },
  },
};
export const navbarWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "2px rgb(205, 203, 203) solid",
      },
    },
  },
};
export const nav: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "10px",
        marginTop: "10px",
      },
    },
  },
};
export const divInsideNav: BlockProps = {
  overrides: {
    Block: {
      style: {
        cursor: "pointer",
        marginRight: "20px",
      },
    },
  },
};
export const createIncidentButton: BlockProps = {
  overrides: {
    Block: {
      style: {
        alignSelf: "flex-end",
        marginBottom: "8px",
        padding: "10px",
      },
    },
  },
};

export const navActiveItem = {
  borderBottom: "rgb(32, 65, 230) solid 2px",
  color: "rgb(32, 65, 230) !important",
  fontWeight: "600",
  paddingRight: "14px",
  paddingLeft: "14px",
  paddingBottom: "16px",
  textDecoration: "none",
  fontSize: "16px",
  display: "inline",
};

export const navNonActiveItem = {
  paddingRight: "14px",
  paddingLeft: "14px",
  paddingBottom: "16px",
  color: "rgb(82, 80, 80)",
  textDecoration: "none",
  fontSize: "16px",
  display: "inline",
};
export const spanInsideNav: BlockProps = {
  onMouseEnter: (event) => {
    if (event.target) {
      (event.target as HTMLElement).style.color = "rgb(106, 147, 197)";
    }
  },
  onMouseLeave: (event) => {
    if (event.target) {
      (event.target as HTMLElement).style.color = "";
    }
  },
};