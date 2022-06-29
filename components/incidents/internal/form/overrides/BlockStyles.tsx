import { BlockProps } from "baseui/block";

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

export const FOOTER_BAR_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      flexDirection: "row-reverse",
      paddingBottom: "20px",
      alignItems: "center",
    },
  },
};

export const ONLOAD_STYLE_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
    },
  },
};

export const ONLOAD_SPINNER_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      alignSelf: "center",
    },
  },
};

export const COMPONENT_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      margin: "20px 0px",
      display: "flex",
      justifyContent: "space-between",
    },
  },
};

export const blockBorder: BlockProps = {
  overrides: {
    Block: {
      style: {
        border: "2px solid black",
      },
    },
  },
};

export const AFFECTED_COMPONENTS_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      marginBottom: "70px",
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

export const CANCEL_BUTTON_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: () => ({
      width: "92px",
      height: "34px",
      alignSelf: "end",
      marginRight: "16px",
    }),
  },
};

export const SUBMIT_BUTTON_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: () => ({
      width: "92px",
      alignSelf: "end",
      height: "34px",
    }),
  },
};

export const ONSUBMIT_BUTTON_STYLE_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: () => ({
      width: "92px",
      alignSelf: "end",
      height: "34px",
      cursor: "not-allowed",
    }),
  },
};
