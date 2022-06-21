import { Block } from "baseui/block";
import * as React from "react";
import IncidentCreation from "../../components/incidents/createIncidents/IncidentCreation";
import { pageStyle } from "../../components/incidents/createIncidents/styles/BlockStyles";

export default () => {
  return (
    <Block {...pageStyle}>
      <IncidentCreation />
    </Block>
  );
};
