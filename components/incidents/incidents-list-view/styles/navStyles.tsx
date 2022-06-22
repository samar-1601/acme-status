import { BlockProps } from "baseui/block";
import Router from "next/router";

export const container: BlockProps = {
  overrides: {
    Block: {
      style: {
        top: "0ch",
        width: "100%",
      },
    },
  },
};

export const content: BlockProps = {
  overrides: {
    Block: {
      style: {
        position: "relative",
        marginTop: "10px",
        width: "100%",
        margin: "10px 10px 0px 0px",
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
export const headerBarText: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "2rem",
        fontWeight: 900,
      },
    },
  },
};
export const headerBarBackIcon: BlockProps = {
  onClick: () => {
    Router.push("/");
  },
  onMouseEnter: (event) => {
    if (event.target) {
      (event.target as HTMLElement).style.backgroundColor = "white";
      (event.target as HTMLElement).style.boxShadow =
        "0 0px 1px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19)";
    }
  },
  onMouseLeave: (event) => {
    if (event.target) {
      (event.target as HTMLElement).style.backgroundColor = "#F8F8FA";
      (event.target as HTMLElement).style.boxShadow = "";
    }
  },
  overrides: {
    Block: {
      style: {
        cursor: "pointer",
        borderRadius: "6000px",
        backgroundColor: "#F8F8FA",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        borderBottom: "5px rgb(205, 203, 203) solid",
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
  onMouseEnter: (event) => {
    if (event.target) {
      (event.target as HTMLElement).style.backgroundColor = "#1858CE";
    }
  },
  onMouseLeave: (event) => {
    if (event.target) {
      (event.target as HTMLElement).style.backgroundColor = "#0E61F6";
    }
  },
  overrides: {
    Block: {
      style: {
        alignSelf: "flex-end",
        borderRadius: "4px",
        marginBottom: "8px",
        padding: "10px",
        color: "white",
        backgroundColor: "#0E61F6",
        cursor: "pointer",
      },
    },
  },
};

export const navActiveItem = {
  borderBottom: "rgb(32, 65, 230) solid 5px",
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
