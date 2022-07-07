// lib
import * as React from "react";
import { useState } from "react";
import Router from "next/router";

// components
import { Block } from "baseui/block";
import { ComponentDescription } from "./ComponentDescription";
import { ComponentGroup } from "./ComponentGroup";
import { ComponentName } from "./ComponentName";
import { ComponentStatus } from "./ComponentStatus";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useSnackbar, DURATION } from "baseui/snackbar";

// styles
import { FORM_STYLES } from "../overrides/componentFormStyles";

// helpers
import { createComponent } from "../helpers/createComponentSubmit";
import { updateComponent } from "../helpers/updateComponentSubmit";

const status = [
  "operational",
  "degraded_performance",
  "partial_outage",
  "major_outage",
  "under_maintenance",
];

export default function ComponentForm(props: any) {
  const [addComponent, setAddComponent] = useState<Boolean>(props.addComponent);
  const [componentName, setComponentName] = useState<String>(
    props.componentName
  );
  const [componentDescription, setComponentDescription] = useState<String>(
    props.componentDescription
  );
  const [componentStatus, setComponentStatus] = useState<number>(
    props.componentStatus
  );
  const [componentGroup, setComponentGroup] = useState<any>(
    props.componentGroup
  );
  const [val, setVal] = useState<any>([]);
  const [submit, setSubmit] = useState<Boolean>(false);
  const { enqueue, dequeue } = useSnackbar();

  React.useEffect(() => {
    if (props) {
      setComponentName(props.componentName);
      setComponentGroup(props.componentGroup);
      setComponentDescription(props.componentDescription);
      setComponentStatus(props.componentStatus);
    }
  }, [props]);

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
    setComponentGroup(e.option);
  }, []);

  const handleCancel = () => {
    Router.push("/components");
  };

  const handleSubmit = () => {
    console.log(componentGroup);
    setSubmit(true);
    let payload: any;
    if (addComponent) {
      if (componentGroup.key != componentGroup.label) {
        payload = {
          component: {
            description: componentDescription,
            status: status[componentStatus],
            name: componentName,
            group_id: componentGroup.id,
          },
        };
      } else {
        payload = {
          component: {
            description: componentDescription,
            status: status[componentStatus],
            name: componentName,
          },
        };
      }
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
            componentGroup: val,
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
        val={val}
        setVal={setVal}
        value={val}
        handleGroupChange={setVal}
      />
      {/* <UptimeBox /> */}
      <Footer
        addComponent={addComponent}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </Block>
  );
}
