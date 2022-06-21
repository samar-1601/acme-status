import { Block } from "baseui/block";
import { useRouter } from "next/router";
import * as React from "react";
import { pageStyle } from "../../../components/incidents/createIncidents/styles/BlockStyles";
import UpdateIncident from "../../../components/incidents/updateIncidents/updateIncident";

export default () => {
  const router = useRouter();
  console.log(router.asPath);
  let param = router.asPath.split("/")[3];
  return (
    <Block {...pageStyle}>
      <UpdateIncident incidentId={param} />
    </Block>
  );
};
