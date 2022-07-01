import { Block } from "baseui/block";
import Router from "next/router";
import * as React from "react";
import { ComponentDescription } from "./ComponentDescription";
import { ComponentGroup } from "./ComponentGroup";
import { ComponentName } from "./ComponentName";
import { ComponentStatus } from "./ComponentStatus";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { UptimeBox } from "./UptimeBox";
import { useSnackbar, DURATION } from "baseui/snackbar";
import { PAGE_ID } from "../../../../constants";
import { FORM_STYLES } from "../../overrides/componentFormStyles";
import { createComponent } from "../helpers/createComponent";
import { updateComponent } from "../helpers/updateComponent";

const status = [
  "operational",
  "degraded_performance",
  "partial_outage",
  "major_outage",
  "under_maintenance",
];

export default function ComponentForm(props: any) {
  const [addComponent, setAddComponent] = React.useState<Boolean>(
    props.addComponent
  );
  const [componentName, setComponentName] = React.useState<String>(
    props.componentName
  );
  const [componentDescription, setComponentDescription] =
    React.useState<String>(props.componentDescription);
  const [componentStatus, setComponentStatus] = React.useState<number>(
    props.componentStatus
  );
  const [componentGroup, setComponentGroup] = React.useState<any>(
    props.componentGroup
  );
  const [submit, setSubmit] = React.useState<Boolean>(false);
  const { enqueue, dequeue } = useSnackbar();

  React.useEffect(() => {
    setComponentName(props.componentName);
  }, [props.componentName]);

  React.useEffect(() => {
    setComponentDescription(props.componentDescription);
  }, [props.componentDescription]);

  React.useEffect(() => {
    setComponentStatus(props.componentStatus);
  }, [props.componentStatus]);

  React.useEffect(() => {
    setComponentGroup(props.componentGroup);
  }, [props.componentGroup]);

  const handleNameChange = React.useCallback(
    (e) => setComponentName(e.target.value),
    []
  );

  const handleDescriptionChange = React.useCallback(
    (e) => setComponentDescription(e.target.value),
    []
  );

  const handleStatusChange = React.useCallback((e) => {
    setComponentStatus(e.value[0].id);
  }, []);

  const handleGroupChange = React.useCallback((e) => {
    console.log(e);
  }, []);

  const handleSubmit = () => {
    setSubmit(true);
    if (addComponent) {
      let payload = {
        component: {
          description: componentDescription,
          status: status[componentStatus],
          name: componentName,
        },
      };
      if (payload.component.name == "") {
        enqueue(
          {
            message: `Component Name can't be Blank!`,
          },
          DURATION.short
        );
        setSubmit(false);
      } else {
        createComponent(
          (props = {
            enqueue: enqueue,
            setSubmit: setSubmit,
            payload: payload,
          })
        );
      }
    } else {
      let payload = {
        component: {
          description: componentDescription,
          status: status[componentStatus],
          name: componentName,
        },
      };
      if (payload.component.name == "") {
        enqueue(
          {
            message: "Component Name can't be Blank!",
          },
          DURATION.short
        );
        setSubmit(false);
      } else {
        updateComponent(
          (props = {
            id: props.id,
            payload: payload,
            enqueue: enqueue,
            setSubmit: setSubmit,
          })
        );
      }
    }
  };

  const handleCancel = () => {
    Router.push("/components");
  };

  return (
    <Block overrides={FORM_STYLES}>
      <Header addComponent={addComponent} />
      <ComponentName
        value={componentName}
        handleNameChange={handleNameChange}
      />
      <ComponentDescription
        value={componentDescription}
        handleDescriptionChange={handleDescriptionChange}
      />
      <ComponentStatus
        id={componentStatus}
        handleStatusChange={handleStatusChange}
      />
      <ComponentGroup
        value={componentGroup}
        handleGroupChange={handleGroupChange}
      />
      <UptimeBox />
      <Footer
        addComponent={addComponent}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </Block>
  );
}
