// lib
import * as React from "react";

// components
import Link from "next/link";
import { Block } from "baseui/block";

// styles
import { CREATE_BUTTON_OVERRIDES } from "../overrides/navStyles";

/**
 * Button component for create incident
 * redirects to the create incident page
 */
export const CreateIncidentButton = React.memo(() => {
  return (
    <Link href="/incidents/new">
      <Block overrides={CREATE_BUTTON_OVERRIDES} className="primary-button">
        Create Incident
      </Block>
    </Link>
  );
});
