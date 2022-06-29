import { BlockProps } from "baseui/block";

export const CONTENT_BLOCK_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      flexDirection: "column",
      paddingTop: "50px",
      backgroundColor: "white",
      paddingLeft: "100px",
      paddingRight: "100px",
      boxShadow:
        "0 0px 1px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19)",
    },
  },
};

export const IMAGE_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      minWidth: "500px",
      minHeight: "400px",
      padding: "24px",
      alignSelf: "center",
    },
  },
};

export const TEXT_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      width: "350px",
      padding: "24px",
    },
  },
};

export const ROW_CONTENT_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      alignContent: "center",
      marginTop: "25px",
      marginBottom: "60px",
      marginLeft: "150px",
      marginRight: "150px",
      flexWrap: "wrap",
      borderRadius: "16px",
      border: "1px solid rgb(20,47,93)",
    },
  },
};

export const HEADER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      marginBottom: "24px",
      lineHeight: "2.5rem",
      fontSize: "2rem",
      fontWeight: 700,
    },
  },
};
export const DESCRIPTION_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      lineHeight: "1.5rem",
      fontSize: "1rem",
      fontWeight: 500,
      // color: "white",
    },
  },
};
export const WELCOME_HEADER_SECOND_HALF_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      gap: "20px",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "40px 100px",
    },
  },
};
export const WELCOME_HEADER_WRAPPER: BlockProps["overrides"] = {
  Block: {
    style: {
      backgroundColor: "rgb(20,47,93)",
      color: "white",
    },
  },
};
export const SIGN_IN_BUTTON: BlockProps["overrides"] = {
  Block: {
    style: {
      backgroundColor: "rgb(20,47,93)",
      border: "1px solid white",
      cursor: "pointer",
      padding: "8px 36px",
      borderRadius: "16px",
      marginTop: "20px",
      alignSelf: "flex-start",
      color: "white",
      ":hover": {
        backgroundColor: "white",
        color: "rgb(20,47,93)",
      },
    },
  },
};
export const WELCOME_HEADER_TEXT_OVERRIDES: BlockProps["overrides"] = {
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
};
export const WELCOME_HEADER_BIG_TEXT_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      fontSize: "3rem",
      lineHeight: "3.525rem",
      fontWeight: 700,
    },
  },
};
export const WELCOME_HEADER_SITE_NAME_OVERRIDES: BlockProps["overrides"] = {
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
};
export const WELCOME_HEADER_MEDIUM_TEXT_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: "1.5rem",
      marginTop: "20px",
    },
  },
};

