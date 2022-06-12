// components
import { Block } from "baseui/block";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";

// styles
import {
  colorfullBar,
  colorfullBarWrapper,
  componentHeader,
  componentTimelineRow,
  componentDetailsWrapper,
  componentStatusText,
  horizontalLine,
} from "./styles/aboutThisStyles";

const getColorFullBars = (count: number) => {
  let barsList = [];
  for (let i = 0; i < count; i++) {
    barsList.push(
      <StatefulPopover
        content={() => (
          <Block padding={"20px"} backgroundColor={"white"}>
            Details of this day !!
          </Block>
        )}
        triggerType={TRIGGER_TYPE.hover}
      >
        <Block {...colorfullBar}></Block>
      </StatefulPopover>
    );
  }
  return barsList;
};

export const AboutThisSite = () => {
  const componentName = "API (example)";
  const componentStatus = "Partial Outage";
  const upTimePercentage = "90.00%";

  return (
    <Block {...componentDetailsWrapper}>
      <Block {...componentHeader}>
        <Block>{componentName}</Block>
        <Block {...componentStatusText}>{componentStatus}</Block>
      </Block>
      <Block {...colorfullBarWrapper}>{getColorFullBars(90)}</Block>
      <Block {...componentTimelineRow}>
        <Block>90 Days Ago</Block>
        <Block {...horizontalLine}></Block>
        <Block>{upTimePercentage}</Block>
        <Block {...horizontalLine}></Block>
        <Block>Today</Block>
      </Block>
    </Block>
  );
};
