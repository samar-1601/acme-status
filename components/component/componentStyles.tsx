import { BlockProps } from "baseui/block";
import Router from "next/router";

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
        margin: "10px 8px 20px 8px",
        boxShadow: "0 0px 1px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19)",
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