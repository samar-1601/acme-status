// lib
import * as React from "react";

// components
import Link from "next/link";
import { Block } from "baseui/block";

// styles
import { CREATE_COMPONENT_BUTTON } from "../overrides/componentListStyles";

export const CreateComponentButton = React.memo(() => {
  return (
    <Link href="/components/new">
      <Block overrides={CREATE_COMPONENT_BUTTON} className="primary-button">
        Create Component
      </Block>
    </Link>
  );
});
