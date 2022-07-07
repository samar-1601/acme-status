// lib
import * as React from "react";

// components
import ComponentForm from "../internal/form/ComponentForm";

// constants
import { PAGE_ID } from "../../../constants";

const status = [
  "operational",
  "degraded_performance",
  "partial_outage",
  "major_outage",
  "under_maintenance",
];

export default function EditComponent(props: any) {
  const [componentName, setComponentName] = React.useState<String>("");

  const getComponent = async () => {
    const URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components/${props.componentId}`;
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    let xjson = await response.json();
    console.log(xjson);
    setComponentName(xjson.name);
    setComponentDescription(xjson.description);
    setComponentStatus(status.indexOf(xjson.status));
    setComponentGroup(xjson.group_id);
  };
  const [componentDescription, setComponentDescription] =
    React.useState<String>("");
  const [componentStatus, setComponentStatus] = React.useState<Number>(0);
  const [componentGroup, setComponentGroup] = React.useState<any>("");
  const [uptime, displayUptime] = React.useState<Boolean>(false);

  React.useEffect(() => {
    getComponent();
  }, []);
  return (
    <ComponentForm
      id={props.componentId}
      addComponent={false}
      componentName={componentName}
      componentDescription={componentDescription}
      componentGroup={componentGroup}
      componentStatus={componentStatus}
      uptime={uptime}
    />
  );
}
