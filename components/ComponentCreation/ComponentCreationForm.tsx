import * as React from "react";

import { NEXT_PUBLIC_AUTH_TOKEN, PAGE_ID } from "../../constants";
import {
  colorfullBarWrapper,
  componentTimelineRow,
  getColorFullBars,
  horizontalLine,
} from "./uptime_bar";

import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { Select, Value } from "baseui/select";
import { Button, SIZE } from "baseui/button";
import { Checkbox } from "baseui/checkbox";
import { Block } from "baseui/block";
import { DatePicker } from "baseui/datepicker";

import styles from "./styles.module.css";
import Router from "next/router";
import { Spinner } from "baseui/spinner";

let startDate: Date | Date[], componentStatus: any, component: any

const Header = function (props: any) {
  let heading="Add Component";
  if(props.id)  heading="Edit Component"
  return (
    <div className={styles.header}>
      <div className={styles.heading}>
        {heading}
      </div>
      <div className={styles.goback}>
        <a href="/component">Back to components</a>
      </div>
    </div>
  );
};

const NameForm =  function (props: any) {
  return (
    <FormControl label="Component name">
      <Input
        id="input-id"
        value={props.def}
        onChange={event => {
          props.setName(event.currentTarget.value)
        }}
        placeholder="Component name"
      />
    </FormControl>
  );
};

const Description  = function (props: any) {
  return (
    <FormControl
      label="Description (optional)"
      caption="Give a helpful description of what this component does"
    >
      <Textarea
        id="textarea-id"
        value={props.def}
        onChange={event => {
            props.setDesc(event.currentTarget.value)
          }
        }
        placeholder="Frontend application and API servers"
      />
    </FormControl>
  );
};

const ComponentGroup = function (props: any) {
  const [groups, setGroups] = React.useState([]);

  const getComponentGroups = async () => {
    const URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/component-groups`;
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    let xjson = await response.json();
    let options = [];
    for (let i = 0; i < xjson.length; i++) {
      options[i] = {
        key: xjson[i].id,
        id: xjson[i].id,
        label: xjson[i].name,
      };
    }
    setGroups(options);
  };

  React.useEffect(() => {
    getComponentGroups();
  }, []);

  return (
    <FormControl label="Component group">
      <Select 
        creatable
        options={groups}
        labelKey="label"
        valueKey="id"
        onChange={({value}) => {
            props.setGrp(value)
          }
        }
        value={props.def}
        placeholder="This component does not belong to a group"
      />
    </FormControl>
  );
};

const Uptime = function () {
  const [date, setDate] = React.useState([new Date()]);
  const [checked, setChecked] = React.useState(false);
  return (
    <>
      <FormControl label="Display uptime">
        <Checkbox checked={checked} onChange={() => setChecked(!checked)}>
          Display the historical data of this component on my status page
        </Checkbox>
      </FormControl>
      {checked && (
        <FormControl label="Select date">
          <DatePicker
            value={date}
            onChange={({ date }) => {
              startDate = date;
              setDate(Array.isArray(date) ? date : [date]);
            }}
            clearable
          />
        </FormControl>
      )}
      {checked && (
        <Block
          overrides={{
            Block: {
              style: () => ({
                paddingTop: "30px",
                paddingBottom: "5px",
                paddingLeft: "5px",
                paddingRight: "5px",
                borderBlock: "1px solid",
                marginTop: "15px",
              }),
            },
          }}
        >
          <Block {...colorfullBarWrapper}>{getColorFullBars(90)}</Block>
          <Block {...componentTimelineRow}>
            <Block>90 Days Ago</Block>
            <Block {...horizontalLine}></Block>
            <Block>100%</Block>
            <Block {...horizontalLine}></Block>
            <Block>Today</Block>
          </Block>
        </Block>
      )}
    </>
  );
};

const ComponentStatusBar = function (props: any) {
  console.log(props.def)
  return (
    <FormControl label="Component Status">
      <Select
        options={[
          {id: "operational", label: "Operational"},
          {id: "degraded_performance", label: "Degraded Performance"},
          {id: "partial_outage", label: "Partial Outage"},
          {id: "major_outage", label: "Major Outage"},
          {id: "under_maintenance", label: "Under Maintenance"},
        ]}
        labelKey="label"
        valueKey="id"
        onChange={({value}) => {
          console.log(value)
          props.setStat(value)
        }}
        value={props.def}
        placeholder=""
      />
    </FormControl>
  );
}

const postData = async function (url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
    },
    body: JSON.stringify(data),
  });
  let xjson = await response.json();
  console.log(xjson);
  return xjson;
};

const putData = async function (url = "", data = {}) {
  const response = await fetch(url, {
    method: "PUT", 
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


const getComponent = async (id: any) => {
  const URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components/${id}`
  const response = await fetch(URL, {
    headers : {
      "Content-Type": "application/json",
      Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`
    }
  })
  let xjson = await response.json();
  return xjson;
}

export const ComponentCreationForm = function (props) {
  const [loaded, setLoaded] = React.useState(true);
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [stat, setStat] = React.useState({
    id: "",
    label: ""
  });
  const [grp, setGrp] = React.useState("");

  React.useEffect(() => {
    setLoaded(false);
    component = getComponent(props.id)
    .then(x => {
      console.log(x)
      setName(x.name)
      setDesc(x.description)
      setStat({
        id: x.status,
        label: x.status
      })
      setGrp(x.group_id)
      setLoaded(true)
    })
  },[]);

  if(loaded)
    return (
    <div className={styles.form}>
      <Header id={props.id}/>
      <NameForm def={name} setName={setName}/>
      <Description def={desc} setDesc={setDesc}/>
      <ComponentStatusBar def={stat} setStat={setStat}/>
      <ComponentGroup def={grp} setGrp={setGrp}/>
      <Uptime />
      <br /><br />
      <div className={styles.buttons}>
      <Button 
          size={SIZE.compact}
          overrides={{
            BaseButton: {
              style: {
                backgroundColor: "blue",
              },
              props: {
                className: "add-button",
              },
            },
          }}
          onClick={() => {
            Router.push("/component");
          }}
        >
          Cancel
        </Button>
        <Button
          size={SIZE.compact}
          overrides={{
            BaseButton: {
              style: {
                backgroundColor: "blue",
                marginLeft: "20px",
              },
              props: {
                className: "add-button",
              },
            },
          }}
          onClick = {()=>{
            Router.push("/component")
          }}
      >Cancel</Button>
      <Button 
          size={SIZE.compact}
          overrides ={{
            BaseButton : {
              style : {
                backgroundColor: "blue",                
                marginLeft: "20px"
              },
              props : {
                className: "add-button"
              }
            }
          }}
          onClick = {()=>{
            if(props.id) {
              console.log(stat)
              let url = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components/${props.id}`
              let data:any ={
                "component": {
                  "description": desc,
                  "status": stat[0].id,
                  "name": name,
                  "start_date": startDate
                }
              }
              console.log(data)
              putData(url,data);
              Router.push("/component")
            }
            else if(!name)  {
              alert("Cannot have empty component name")
            } else if(grp) {
              let url = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components`
              let data:any ={
                "component": {
                  "description": desc,
                  "status": stat[0].id,
                  "name": name,
                  "start_date": startDate
                }
              }

              let comp:any;
              postData(url, data).then(res => () => {
                  comp=res.id;
                }
              )
              url = `https://api.statuspage.io/v1/pages/${PAGE_ID}/component-groups`
              data = {
                "description": "",
                "component_group": {
                  "components": [
                    comp
                  ],
                "name": grp
                }
              }
              postData(url, data)
            } else {
              let url = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components`
              let data:any ={
                "component": {
                  "description": desc,
                  "status": stat[0].id,
                  "name": name,
                  "start_date": startDate,
                  "group_id": grp
                }
              }
              postData(url,data).then(res => console.log(res))
              Router.push("/component")
            }
          }}
          >Save </Button>
      </div>
      </div>)
  else
    return <Spinner />
}
