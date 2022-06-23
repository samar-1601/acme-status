import { BlockProps } from "baseui/block";

export const optionStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        margin: "5px",
      },
      props: { className: "sideBarOption" },
    },
  },
};

export const navBarStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
      },
    },
  },
};
