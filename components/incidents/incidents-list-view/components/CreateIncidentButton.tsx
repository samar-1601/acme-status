// lib
import * as React from "react";

// components
import Link from "next/link";
import { Block } from "baseui/block";

// styles
import { createIncidentButton } from "../styles/navStyles";

/**
 * Button component for create incident
 * redirects to the create incident page
 */
export const CreateIncidentButton = React.memo(() => {
  return (
    <Link href="/incidents/new">
      <Block {...createIncidentButton} className="primary-button">
        Create incident
      </Block>
    </Link>
  );
});
