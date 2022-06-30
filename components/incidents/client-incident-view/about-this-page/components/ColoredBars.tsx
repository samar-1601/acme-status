import { Block } from "baseui/block";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";
import {
  barColorDeterminer,
  generateRandomBarsData,
  getDateforBar,
} from "../helpers/helpers";
import { colorfullBar } from "../overrides/aboutThisStyles";
import { hoverBox, hoverDateStyle } from "../overrides/barHoverStyles";

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
          <Block {...hoverBox}>
            <Block {...hoverDateStyle}>{getDateforBar(totalDays, i)}</Block>
          </Block>
        )}
        triggerType={TRIGGER_TYPE.hover}
      >
        <Block
          {...colorfullBar}
          backgroundColor={barColorDeterminer(barValues[i])}
        ></Block>
      </StatefulPopover>
    );
  }
  return <>{barsList}</>;
};
