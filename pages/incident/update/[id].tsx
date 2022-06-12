import { useRouter } from "next/router";
import * as React from "react";
import UpdateIncidentForm from "../../../components/incidents/updateIncidents/updateIncidentForm";

export default () => {
  const router = useRouter();
  console.log(router.query.id);
  return <UpdateIncidentForm incidentId={router.query.id} />;
};
