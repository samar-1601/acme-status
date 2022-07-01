import { BlockProps } from "baseui/block";

export const PAGE_CONTAINER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      width: "80%",
      fontFamily:
        "'proxima-nova', 'Helvetica Neue', Helvetica, Arial, Sans-Serif",
      margin: "auto",
    },
  },
};
//Top border for each section - 1px , border-color :#E6E6E9

export const HOME_PAGE_HEADER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      fontSize: "2.7rem",
      margin: "auto",
      fontWeight: 700,
      padding: "1rem 3rem",
      color: "rgb(51,51,51)",
    },
  },
};
export const CLIENTS_COMMON_COMPONENTS_WRAPPER_OVERRIDES: BlockProps["overrides"] =
  {
    Block: {
      style: {
        margin: "2rem",
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "1.6rem",
      },
    },
  };

export const H1_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      marginBottom: "2rem",
      fontWeight: 700,
      color: "rgb(51,51,51)",
      fontSize: "30px",
    },
  },
};
export const H3_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      marginBottom: "3rem",
      fontWeight: 600,
      color: "rgb(51,51,51)",
      fontSize: "1.75rem",
      lineHeight: "2.3625rem",
    },
  },
};

export const ERROR_PAGE_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
      flexDirection: "column",
      textAlign: "center",
    },
  },
};

export const MAIN_STYLE_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: "20%",
      paddingRight: "20%",
    },
  },
};

