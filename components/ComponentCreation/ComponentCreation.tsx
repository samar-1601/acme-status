import * as React from "react";
import ComponentForm from "./ComponentForm";

export const ComponentCreation = React.memo(() => {
  const [componentName, setComponentName] = React.useState<String>("");
  const [componentDescription, setComponentDescription] = React.useState<String>("");
  const [componentStatus, setComponentStatus] = React.useState<Number>(0);
  const [componentGroup, setComponentGroup] = React.useState<any>("");
  const [uptime, displayUptime] = React.useState<Boolean>(false);

  return(
    <ComponentForm 
      id={""}
      addComponent={true}
      componentName={componentName}
      componentDescription={componentDescription}
      componentGroup={componentGroup}
      componentStatus={componentStatus}
      uptime={uptime}
    />
  );
})