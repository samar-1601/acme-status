import * as React from 'react';

import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";
import { Block, BlockProps } from "baseui/block";

export const colorfullBarWrapper: BlockProps = {
  overrides: {
    Block: {
      style: {
        width: "100%",
        display: "flex",
        gap: "4px",
      },
    },
  },
};

export const componentHeader: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      },
    },
  },
};

export const horizontalLine: BlockProps = {
  overrides: {
    Block: {
      style: {
        border: "0.5px solid rgb(211,211,211)",
        width: "1px",
        flexGrow: 1,
        margin: "0px 15px",
      },
    },
  },
};

export const componentTimelineRow: BlockProps = {
  overrides: {
    Block: {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row",
        color: "grey",
        fontSize: "14px",
      },
    },
  },
};

export const getColorFullBars = (count: number) => {
  let barsList = [];
  for (let i = 0; i < count; i++) {
    barsList.push(
      <StatefulPopover key={i}
        content={() => (
          <Block padding={"20px"} backgroundColor={"white"}>
            Details of this day !!
          </Block>
        )}
        triggerType={TRIGGER_TYPE.hover}
      >
        <Block overrides = {{
          Block: {
            style: {
              width: "calc(100%/90)",
              height: "42px",
              backgroundColor: "rgb(211,211,211)",
              margin: "12px 0px",
            },
          },}
        }></Block>
      </StatefulPopover>
    );
  }
  return barsList;
};

export const componentNameText: BlockProps = {
  overrides: {
    Block: {
      style: {
        fontSize: "18px",
        fontWeight: 900,
      },
    },
  },
};

export const componentStatus: BlockProps = {
  overrides: {
    Block: {
      style: () => ({
        textTransform: "capitalize",
        fontSize: "17px",
        fontWeight: 700,
      }),
    },
  },
};

