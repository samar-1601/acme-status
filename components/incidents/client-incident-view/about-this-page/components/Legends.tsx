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
  legendBoxWrapperStyle,
  legendBoxStyle,
} from "../overrides/aboutThisStyles";

export const Legends: React.FC = React.memo(() => {
  return (
    <Block {...legendBoxWrapperStyle}>
      <Block
        {...legendBoxStyle}
        backgroundColor={legendColorDeterminer(ComponentStatusType.MajorOutage)}
      ></Block>
      <Block>Major Outage</Block>
      <Block
        {...legendBoxStyle}
        backgroundColor={legendColorDeterminer(
          ComponentStatusType.PartialOutage
        )}
      ></Block>
      <Block>Partial Outage</Block>
      <Block
        backgroundColor={legendColorDeterminer(ComponentStatusType.Operational)}
        {...legendBoxStyle}
      ></Block>
      <Block>Operational</Block>
      <Block
        {...legendBoxStyle}
        backgroundColor={legendColorDeterminer(
          ComponentStatusType.UnderMaintenance
        )}
      ></Block>
      <Block>No Incidents Reported</Block>
    </Block>
  );
});
