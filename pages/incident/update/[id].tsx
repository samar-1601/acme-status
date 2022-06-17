import { useRouter } from "next/router";
import * as React from "react";
import UpdateIncident from "../../../components/incidents/updateIncidents/updateIncident";

export default () => {
  const router = useRouter();
  console.log(router.asPath);
  let param = router.asPath.split("/")[3];
  return <UpdateIncident incidentId={param} />;
};
