import { Block } from "baseui/block";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";
import {
  barColorDeterminer,
  generateRandomBarsData,
  getDateforBar,
} from "../helpers/helpers";
import { COLORFUL_BAR_OVERRIDES } from "../overrides/aboutThisStyles";
import {
  HOVER_BOX_OVERRIDES,
  HOVER_DATE_OVERRIDES,
} from "../overrides/barHoverStyles";

interface Props {
  totalDays: number;
}
/**
 * get the status bars for components
 * @param totalDays the number of bars to render
 * @returns List of render ready bars
 */
export const ColoredBars: React.FC<Props> = ({ totalDays }) => {
  let barsList = [];
  const barValues = generateRandomBarsData(totalDays);
  for (let i = 0; i < totalDays; i++) {
    barsList.push(
      <StatefulPopover // BASE UI component to show values when the bar is hovered
        key={`bar${i}`}
        content={() => (
          <Block overrides={HOVER_BOX_OVERRIDES}>
            <Block overrides={HOVER_DATE_OVERRIDES}>
              {getDateforBar(totalDays, i)}
            </Block>
          </Block>
        )}
        triggerType={TRIGGER_TYPE.hover}
      >
        <Block
          overrides={COLORFUL_BAR_OVERRIDES}
          backgroundColor={barColorDeterminer(barValues[i])}
        ></Block>
      </StatefulPopover>
    );
  }
  return <>{barsList}</>;
};
