import * as React from "react"

import { NEXT_PUBLIC_AUTH_TOKEN, PAGE_ID } from "../../constants"
import { colorfullBarWrapper, componentTimelineRow, getColorFullBars, horizontalLine } from "./uptime_bar";

import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import {Select, Value} from "baseui/select";
import { Button, SIZE } from "baseui/button";
import { Checkbox } from "baseui/checkbox";
import { Block } from "baseui/block";
import { DatePicker } from "baseui/datepicker";

import styles from "./styles.module.css"
import Router from "next/router";

let componentName: string, componentDescription: string, componentGroup: any, startDate: Date | Date[]

const Header = function () {
  return (
    <div className={styles.header}>
      <div className={styles.heading}>
        Add component
      </div>
      <div className={styles.goback}>
        <a href="/components">Back to components</a>
      </div>
    </div>
  );
}

const NameForm =  function () {
  const [name, setName] = React.useState("");
  return (
    <FormControl label="Component name">
      <Input
        id="input-id"
        value={name}
        onChange={event => {
          componentName=event.currentTarget.value
          setName(event.currentTarget.value)
        }}
        placeholder="Component name"
      />
    </FormControl>
  );
}

const Description  = function () {
  const [description, setDescription] = React.useState("");
  return (
    <FormControl label="Description (optional)" caption="Give a helpful description of what this component does">
      <Textarea
        id="textarea-id"
        value={description}
        onChange={event => {
            componentDescription=event.currentTarget.value
            setDescription(event.currentTarget.value)
          }
        }
        placeholder="Frontend application and API servers"
      />
    </FormControl>
  );
}

const ComponentGroup = function () {
  const [groups, setGroups] = React.useState([]);
  const [active, setActive] = React.useState<Value>([]);

  const getComponentGroups = async () => {
    const URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/component-groups`
    const response = await fetch(URL, {
      headers : { 
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`
      }
    })
    let xjson = await response.json();
    let options = [];
    for(let i=0; i<xjson.length; i++) {
      options[i]={
        key: xjson[i].id,
        id: xjson[i].id,
        label: xjson[i].name,
      };
    }
    setGroups(options)
  }

  React.useEffect(()=>{
    getComponentGroups();
  },[]);

  return (
  <FormControl label="Component group">
    <Select 
      creatable
      options={groups}
      labelKey="label"
      valueKey="id"
      onChange={({value}) => {
          componentGroup=value
          setActive(value)
        }
      }
      value={active}
      placeholder="This component does not belong to a group"
    />
  </FormControl>
  );
}

const Uptime =  function () {
  const [date, setDate] = React.useState([new Date()]);
  const [checked, setChecked] = React.useState(false);
  return (
    <>
      <FormControl label="Display uptime">
        <Checkbox
          checked={checked}
          onChange={() => setChecked(!checked)}
        >
          Display the historical data of this component on my status page
        </Checkbox>
      </FormControl>
      <FormControl label="Select date">
        <DatePicker
          value={date}
          onChange={({ date }) => {
              startDate=date
              setDate(Array.isArray(date) ? date : [date])
            }
          }
          clearable
        />
      </FormControl>
      {checked &&<Block overrides={{
        Block : {
          style: () => ({
            paddingTop: "30px",
            paddingBottom: "5px",
            paddingLeft: "5px",
            paddingRight: "5px",
            borderBlock: "1px solid",
            marginTop: "15px",
          })
        }
      }}>
        <Block {...colorfullBarWrapper}>{getColorFullBars(90)}</Block>
        <Block {...componentTimelineRow}>
          <Block>90 Days Ago</Block>
          <Block {...horizontalLine}></Block>
          <Block>100%</Block>
          <Block {...horizontalLine}></Block>
          <Block>Today</Block>
        </Block>
      </Block>}
    </>
  );
}

const postData = async function (url = "", data = {}) {
  const response = await fetch(url, {
    method: 'POST', 
    headers: {
      "Content-Type": "application/json",
      Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`
    },
    body: JSON.stringify(data) 
  });
  let xjson = await response.json(); 
  console.log(xjson)
  return xjson;
}

export const ComponentCreationForm = function () {
  return (
    <div>
      <Header />
      <NameForm />
      <Description />
      <ComponentGroup />
      <Uptime />
      <br /><br />
      <Button 
          size={SIZE.compact}
          overrides ={{
            BaseButton : {
              style : {
                backgroundColor: "blue",
                float: "right"
              },
              props : {
                className: "add-button"
              }
            }
          }}
          onClick = {()=>{
            console.log(componentGroup)
            if(componentGroup.isCreatable) {
              let url = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components`
              let data:any ={
                "component": {
                  "description": componentDescription,
                  "status": "operational",
                  "name": componentName,
                  "start_date": startDate
                }
              }

              let comp:any;
              postData(url, data).then(res => () => {
                  comp=res.id;
                }
              )
              console.log(comp)
              
              url = `https://api.statuspage.io/v1/pages/${PAGE_ID}/component-groups`
              data = {
                "description": "",
                "component_group": {
                  "components": [
                    comp
                  ],
                "name": componentGroup
                }
              }
              postData(url, data)

            } else {
              console.log(componentGroup)
              let url = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components`
              let data:any ={
                "component": {
                  "description": componentDescription,
                  "status": "operational",
                  "name": componentName,
                  "start_date": startDate,
                  "group_id": componentGroup.id
                }
              }
              postData(url,data).then(res => console.log(res))
              
            }
            Router.push("/components")
          }}
          >Save Component
        </Button>
    </div>)
}





