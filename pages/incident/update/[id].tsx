import { useRouter } from "next/router";
import * as React from "react";
import UpdateIncident from "../../../components/incidents/updateIncidents/updateIncident";

export default () => {
  const router = useRouter();
  console.log(router.query.id);
  return <UpdateIncident incidentId={router.query.id} />;
};
