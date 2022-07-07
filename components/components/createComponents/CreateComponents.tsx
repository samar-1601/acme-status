// lib
import * as React from "react";

// components
import ComponentForm from "../internal/form/ComponentForm";

export const ComponentCreation = React.memo(() => {
  return (
    <ComponentForm
      id={""}
      addComponent={true}
      componentName={""}
      componentDescription={""}
      componentGroup={""}
      componentStatus={0}
      uptime={false}
    />
  );
});
