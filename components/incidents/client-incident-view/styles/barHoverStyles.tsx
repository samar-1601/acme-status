// component proptype
import { BlockProps } from "baseui/block";

export const hoverRelatedTextStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        color: "#aaa",
        fontSize: "0.8125rem",
        lineHeight: "1.24921875rem",
        fontWeight: 450,
        marginTop: "10px",
        textTransform: "uppercase",
      },
    },
  },
};
export const hoverDateStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "14px",
        fontWeight: 500,
      },
    },
  },
};
export const hoverBox: BlockProps = {
  overrides: {
    Block: {
      style: {
        padding: "15px 15px",
        backgroundColor: "white",
        fontFamily: "'proxima-nova', 'Helvetica Neue', Helvetica, Arial, Sans-Serif",
      },
    },
  },
};
