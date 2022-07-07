// lib
import React from "react";

// components
import { Block } from "baseui/block";

// constants
import { ComponentStatusType } from "../../../../../constants";

// helpers
import { legendColorDeterminer } from "../helpers/helpers";

// styles
import {
  LEGEND_BOX_WRAPPER_OVERRIDES,
  LEGEND_BOX_OVERRIDES,
} from "../overrides/aboutThisStyles";

export const Legends: React.FC = React.memo(() => {
  return (
    <Block overrides={LEGEND_BOX_WRAPPER_OVERRIDES}>
      <Block
        overrides={LEGEND_BOX_OVERRIDES}
        backgroundColor={legendColorDeterminer(ComponentStatusType.MajorOutage)}
      ></Block>
      <Block>Major Outage</Block>
      <Block
        overrides={LEGEND_BOX_OVERRIDES}
        backgroundColor={legendColorDeterminer(
          ComponentStatusType.PartialOutage
        )}
      ></Block>
      <Block>Partial Outage</Block>
      <Block
        backgroundColor={legendColorDeterminer(ComponentStatusType.Operational)}
        overrides={LEGEND_BOX_OVERRIDES}
      ></Block>
      <Block>Operational</Block>
      <Block
        overrides={LEGEND_BOX_OVERRIDES}
        backgroundColor={legendColorDeterminer(
          ComponentStatusType.UnderMaintenance
        )}
      ></Block>
      <Block>No Incidents Reported</Block>
    </Block>
  );
});
