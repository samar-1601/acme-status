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
      style: { display: "flex", flexDirection: "row-reverse" },
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
