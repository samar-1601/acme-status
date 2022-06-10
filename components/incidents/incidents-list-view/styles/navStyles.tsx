import { BlockProps } from "baseui/block";

export const container: BlockProps = {
  overrides: {
    Block: {
      style: {
        position: "fixed",
        top: "0ch",
        width: "80%",
        zIndex: "100",
        backgroundColor: "white",
        padding: "0.5rem",
      },
    },
  },
};

export const content: BlockProps = {
  overrides: {
    Block: {
      style: {
        position: "relative",
        top: "150px",
        width: "100%",
        paddingLeft: "10px",
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
        marginLeft: "1px",
        paddingBottom: "6px",
      },
    },
  },
};
export const createIncidentButton: BlockProps = {
  onMouseEnter: (event) => {
    if (event.target) {
      (event.target as HTMLElement).style.boxShadow = "0 2px 2px 0 rgba(0, 0, 0, 0.2), 2px 2px 4px 0 rgba(0, 0, 0, 0.19)";
    }
  },
  onMouseLeave: (event) => {
    if (event.target) {
      (event.target as HTMLElement).style.boxShadow = "";
    }
  },
  overrides: {
    Block: {
      style: {
        alignSelf: "flex-end",
        borderRadiusWidth: "4px",
        marginBottom : "8px",
        padding : "8px",
        color: "white",
        backgroundColor: "rgb(32, 65, 230)",
        cursor: "pointer"
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
  paddingBottom: "16.5px",
  textDecoration: "none",
  fontSize: "14px",
  display: "inline",
};

export const navNonActiveItem = {
  paddingRight: "14px",
  paddingLeft: "14px",
  paddingBottom: "16px",
  color: "rgb(82, 80, 80)",
  textDecoration: "none",
  fontSize: "14px",
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
