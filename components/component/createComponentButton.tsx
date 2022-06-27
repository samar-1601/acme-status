import * as React from "react";

import Link from "next/link";
import { Block } from "baseui/block";

import { createComponentButton } from "./componentStyles";

export const CreateComponentButton = React.memo(() => {
  return (
    <Link href="/component/new">
      <Block {...createComponentButton} className="primary-button">
        Create Component
      </Block>
    </Link>
  );
});
