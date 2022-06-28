import { BlockProps } from "baseui/block";

export const contentBlock: BlockProps = {
  display: "flex",
  flexDirection: "column",
  paddingTop: "50px",
  backgroundColor: "white",
  paddingLeft: "100px",
  paddingRight: "100px",
  overrides: {
    Block: {
      style: {
        boxShadow:
          "0 0px 1px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19)",
      },
    },
  },
};

export const imageProps: BlockProps = {
  minWidth: "500px",
  minHeight: "400px",
  padding: "24px",
  alignSelf: "center",
};

export const textProps: BlockProps = {
  width: "350px",
  padding: "24px",
};

export const rowContent: BlockProps = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  alignContent: "center",
  marginTop: "25px",
  marginBottom: "60px",
  marginLeft: "150px",
  marginRight: "150px",
  // backgroundColor: "rgb(20,47,93)",
  flexWrap: true,
  // color: "white",
};

export const headerStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        marginBottom: "24px",
        lineHeight: "2.5rem",
        fontSize: "2rem",
        fontWeight: 700,
      },
    },
  },
};
export const descriptionContentStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        lineHeight: "1.5rem",
        fontSize: "1rem",
        fontWeight: 500,
        // color: "white",
      },
    },
  },
};
export const welcomeHeaderSecondHalfStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        gap: "20px",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "40px 100px",
      },
    },
  },
};
export const welcomeHeaderWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        backgroundColor: "rgb(20,47,93)",
        color: "white",
      },
    },
  },
};
export const signInButton: BlockProps = {
  onMouseEnter: (event) => {
    if (event.target) {
      (event.currentTarget as HTMLElement).style.backgroundColor = "white";
      (event.currentTarget as HTMLElement).style.color = "rgb(20,47,93)";
    }
  },
  onMouseLeave: (event) => {
    if (event.target) {
      (event.currentTarget as HTMLElement).style.backgroundColor =
        "rgb(20,47,93)";
      (event.currentTarget as HTMLElement).style.color = "white";
    }
  },
  overrides: {
    Block: {
      style: {
        backgroundColor: "rgb(20,47,93)",
        border: "1px solid white",
        cursor: "pointer",
        padding: "8px 36px",
        borderRadius: "16px",
        marginTop: "20px",
        alignSelf: "flex-start",
      },
    },
  },
};
export const welcomeHeaderTextWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "space-around",
        alignItems: "center",
        width: "450px",
      },
    },
  },
};
export const welcomeHeaderBigText: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "3rem",
        lineHeight: "3.525rem",
        fontWeight: 700,
      },
    },
  },
};
export const welcomeHeaderSiteName: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "3.5rem",
        lineHeight: "3.525rem",
        fontWeight: 500,
        background: "linear-gradient(rgba(0, 0, 0, 0.5), rgb(20,47,93))",
        color: "white",
        padding: "20px 0px 30px 0px",
        textAlign: "center",
      },
    },
  },
};
export const welcomeHeaderMediumText: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: "1.5rem",
        marginTop: "20px",
      },
    },
  },
};
export const headerImageWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        // borderRadius: "8px",
      },
    },
  },
};
