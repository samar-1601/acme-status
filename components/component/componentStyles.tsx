import { BlockProps } from "baseui/block";
import Router from "next/router";

export const detailStyles: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "14px",
        color: "#808080",
        paddingTop: "10px",
      }
    }
  }
}

export const content: BlockProps = {
  overrides: {
    Block: {
      style: {
        position: "relative",
        margin: "10px 0px",
      },
    },
  },
};

export const createComponentButton: BlockProps = {
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

export const divInsideNav: BlockProps = {
  overrides: {
    Block: {
      style: {
        cursor: "pointer",
        marginRight: "20px",
        fontSize: "14px",
      },
    },
  },
};

export const divInsideNavDisabled: BlockProps = {
  overrides: {
    Block: {
      style: {
        cursor: "not-allowed",
        marginRight: "20px",
        fontSize: "14px",
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

export const componentsListView: BlockProps = {
  overrides: {
    Block: {
      style: {
        width: "100%",
        margin: "auto",
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
        marginRight: "15px",
        cursor: "pointer",
      },
    },
  },
};

export const header: BlockProps = {
  overrides : {
    Block : {
      style : {
        padding: "20px",
        fontSize: "20px",
        display: "flex",
        justifyContent: "space-between",
      }
    }
  }
}

export const heading: BlockProps = {
  overrides : {
    Block : {
      style : {
        paddingTop: "5px",
        fontSize: "24px",
        fontWeight: 400,
        display: "flex",
      }
    }
  }
}

export const listItem: BlockProps = {
  overrides : {
    Block : {
      style : {
        fontSize: "16px",
        display: "flex",
      }
    }
  }
}

export const element: BlockProps = {
  overrides : {
    Block : {
      style : {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: "16px",
        margin: "10px auto 20px auto",
        boxShadow: "0 0px 1px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19)",
        width: "80%",
        borderRadius: "8px",
      }
    }
  }
}

export const loader: BlockProps = {
  overrides : {
    Block : {
      style : {
        position: "absolute",
        left: "50%",
        top: "300px",
      }
    }
  }
}

export const page: BlockProps = {
  overrides : {
    Block : {
      style : {
        width: "80%",
        margin: "auto",   
        backgroundColor: "#F8F8FA",
      }
    }
  }
}

export const x: BlockProps = {
  overrides : {
    Block : {
      style : {
        
      }
    }
  }
}