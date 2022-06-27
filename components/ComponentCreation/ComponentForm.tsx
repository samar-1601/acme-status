import { Block } from "baseui/block";
import Router from "next/router";
import * as React from "react";
import { ComponentDescription } from "./componentDescription";
import { ComponentGroup } from "./componentGroup";
import { ComponentName } from "./componentName";
import { ComponentStatus } from "./componentStatus";
import { Footer } from "./footer";
import { Header } from "./header";
import { UptimeBox } from "./uptimeBox";
import { useSnackbar, DURATION } from "baseui/snackbar";
import { PAGE_ID, NEXT_PUBLIC_AUTH_TOKEN } from "../../constants";
import { formStyles } from "./componentCreationStyles";

const status = ["operational", "degraded_performance", "partial_outage", "major_outage", "under_maintenance"]

export default function ComponentForm(props: any) {
  const [addComponent, setAddComponent] = React.useState<Boolean>(props.addComponent);
  const [componentName, setComponentName] = React.useState<String>(props.componentName);
  const [componentDescription, setComponentDescription] = React.useState<String>(props.componentDescription);
  const [componentStatus, setComponentStatus] = React.useState<number>(props.componentStatus);
  const [componentGroup, setComponentGroup] = React.useState<String>(props.componentGroup);
  const [submit, setSubmit] = React.useState<Boolean>(false);
  const { enqueue, dequeue } = useSnackbar();
  
  React.useEffect(()=> {
    setComponentName(props.componentName);
  }, [props.componentName]);

  React.useEffect(()=> {
    setComponentDescription(props.componentDescription);
  }, [props.componentDescription]);

  React.useEffect(()=> {
    setComponentStatus(props.componentStatus);
  }, [props.componentStatus]);

  React.useEffect(()=> {
    setComponentGroup(props.componentGroup);
  }, [props.componentGroup]);

  const handleNameChange = React.useCallback((e)=>setComponentName(e.target.value),[]);

  React.useEffect(()=>{
    console.log("re-renderinng");
  }, [addComponent])

  const handleDescriptionChange = React.useCallback((e)=>setComponentDescription(e.target.value),[]);

  const handleStatusChange = React.useCallback((e) => {
    setComponentStatus(e.value[0].id)
  }, [])

  const handleGroupChange = React.useCallback((e) => {
    console.log(e)
    if(e[0].id != e[0].label)  setComponentGroup(e[0].id);
    else setComponentGroup(e[0].label)
  }, [])

  const handleSubmit = () => {
    setSubmit(true)
    const payload = {
      "component" : {
        "description": componentDescription,
        "status": status[componentStatus],
        "name": componentName,
        "group_id": componentGroup,
      }
    }
    console.log(payload)
    if (payload.component.name == "") {
      enqueue({
          message: "Component Name can't be Blank!",
        },
        DURATION.long
      );
      setSubmit(false);
    } else {
      fetch("https://api.statuspage.io/v1/pages/" + PAGE_ID + "/components", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
        },
        body: JSON.stringify(payload),
      })
      .then((response) => response.json())
      .then((json) => {
        if ("error" in json) {
          throw json.error; 
        }
        enqueue({
          message: "Successfully submitted form details",
        },
        DURATION.medium
        );
          setSubmit(false);
        })
        .then(() => {
          Router.push("/component");
        })
        .catch((err) => {
          enqueue({
              message: "Failed to Submit Form. Please Try Again!",
            },
            DURATION.long
          );
          setSubmit(false);
          console.log(err);
        });
    }

  }

  const handleCancel = () => {
    Router.push("/component")
  }

  return (
    <Block {...formStyles}>
      <Header addComponent={addComponent}/>
      <ComponentName value={componentName} handleNameChange={handleNameChange} />
      <ComponentDescription value={componentDescription} handleDescriptionChange={handleDescriptionChange}/>
      <ComponentStatus id={componentStatus} handleStatusChange={handleStatusChange}/>
      <ComponentGroup value={componentGroup} handleGroupChange={handleGroupChange}/>
      <UptimeBox />
      <Footer handleSubmit={handleSubmit} handleCancel={handleCancel}/>
    </Block>
  );
}