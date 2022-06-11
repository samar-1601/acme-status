// lib
import * as React from "react";

// components
import Link from "next/link";
import { Block } from "baseui/block";

// styles
import { createIncidentButton } from "./styles/navStyles";

/**
 * Button component for create incident
 */
export const CreateIncidentButton = React.memo(() => {
  console.log("create Incident Rendered");
  return (
    <Link href="/incident/new">
      <Block {...createIncidentButton}>Create incident</Block>
    </Link>
  );
});
