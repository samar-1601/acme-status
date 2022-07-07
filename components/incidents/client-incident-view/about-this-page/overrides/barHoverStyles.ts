// component proptype
import { BlockProps } from "baseui/block";

export const HOVER_DATE_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      fontSize: "14px",
      fontWeight: 500,
    },
  },
};
export const HOVER_BOX_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      padding: "15px 15px",
      backgroundColor: "white",
      fontFamily:
        "'proxima-nova', 'Helvetica Neue', Helvetica, Arial, Sans-Serif",
    },
  },
};
