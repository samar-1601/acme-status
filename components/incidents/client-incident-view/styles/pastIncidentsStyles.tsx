// component prop type
import { BlockProps } from "baseui/block";

export const headerDateStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "1.25rem",
        lineHeight: "1.8125rem",
        fontWeight: 900,
        paddingBottom: "10px",
        borderBottom: "0.1px grey solid",
      },
    },
  },
};
export const incidentNameStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "1.25rem",
        lineHeight: "1.8125rem",
        fontWeight: 900,
      },
    },
  },
};
export const incidentStatusStyle: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
        fontWeight: "900",
        textTransform: "capitalize",
        display: "inline",
      },
    },
  },
};
export const incidentStatusBody: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
        fontWeight : 400,
        display: "inline",
      },
    },
  },
};
export const incidentWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        margin: "25px 0",
      },
    },
  },
};

export const incidentStatusDate: BlockProps = {
  overrides: {
    Block: {
      style: {
        color: "rgb(175, 175, 175)",
        fontSize: "0.875rem",
        lineHeight: "1.334375rem",
        margin: "5px 0px 0px 0px",
      },
    },
  },
};

export const incidentDetailsWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        margin: "15px 0",
      },
    },
  },
};
