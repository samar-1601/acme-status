import { BlockProps } from "baseui/block";

export const mainStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        flexDirection: "column",
        paddingLeft: "20%",
        paddingRight: "20%",
        fontFamily: "Arial, Helvetica, sans-serif",
      },
    },
  },
};

export const buttonAlignment: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        flexDirection: "row-reverse",
        position: "fixed",
        left: "0",
        bottom: "0",
        width: "100%",
        height: "7%",
        paddingBottom: "20px",
        backgroundColor: "white",
        alignItems: "center",
      },
    },
  },
};

export const onLoadStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      },
    },
  },
};

export const onLoadSpinnerStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        alignSelf: "center",
      },
    },
  },
};

export const componentStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        margin: "20px 0px",
        display: "flex",
        justifyContent: "space-between",
      },
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

export const affectedComponenetsStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        marginBottom: "70px",
      },
    },
  },
};

export const errorPageStyle: BlockProps = {
  overrides: {
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
  },
};
