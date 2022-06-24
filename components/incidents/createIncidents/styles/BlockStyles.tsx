import { BlockProps } from "baseui/block";

export const mainStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        flexDirection: "column",
        paddingLeft: "20%",
        paddingRight: "20%",
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
        paddingBottom: "20px",
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

export const cancelButtonStyle: BlockProps = {
  overrides: {
    Block: {
      style: () => ({
        width: "92px",
        height: "34px",
        alignSelf: "end",
        marginRight: "16px",
      }),
    },
  },
};

export const submitButtonStyle: BlockProps = {
  overrides: {
    Block: {
      style: () => ({
        width: "92px",
        alignSelf: "end",
        height: "34px",
      }),
    },
  },
};

export const onSubmitButtonStyle: BlockProps = {
  overrides: {
    Block: {
      style: () => ({
        width: "92px",
        alignSelf: "end",
        height: "34px",
        cursor: "not-allowed",
      }),
    },
  },
};
