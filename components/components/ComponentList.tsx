import * as React from "react";
import { ICON_URL, NEXT_PUBLIC_AUTH_TOKEN, PAGE_ID } from "../../constants";

import { Spinner } from "baseui/spinner";
import { Avatar } from "baseui/avatar";
import styles from "./styles.module.css"

export const ComponentList = function () {
  const [dataList, setDataList] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  
  const Component = function (props: any) {
    const [msg, setMsg] = React.useState("");

    const getUptime = async () => {
      const URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components/${props.comp.id}/uptime`;
      const response = await fetch(URL, {
        headers : { 
          "Content-Type": "application/json",
          Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`
        }
      })
      let xjson = await response.json();
      if(!xjson.error) {
        const date1 = new Date(xjson.range_end);
        const date2 = new Date(xjson.range_start);
        let days = Math.ceil(Math.abs(date1.valueOf()-date2.valueOf())/(1000*60*60*24));
        setMsg(String(xjson.uptime_percentage)+"% uptime in the past "+String(days)+" days");
      } else {
        setMsg("Uptime Data unavailable!")
      }
    }

    React.useEffect(()=>{
      getUptime();
    },[]);

    let details: any;
    if(msg) details = (<><span className={styles.itemName}>{props.comp.name}</span><br />
                        <span className={styles.itemDescription}>{msg}</span></>);
    else  details = <Spinner />

    return (
      <div className={styles.listItem}>
        <div>
          <Avatar 
            name = {props.comp.status}
            src = {ICON_URL[props.comp.status]}
            size="scale600"
            overrides = {{
              Root: {
                style: {
                  paddingTop: "9px",
                  paddingRight: "8px"
                }
              }
            }}
          >
          </Avatar>
        </div>
        <div>{details}</div>
      </div>)
  };

  const GenerateList = function (props: any) {
    let dataList = props.dataList;
    let listItems = [];
    for (let i=0; i<dataList.length; i++) {
      listItems[i] = <Component key={dataList[i].id} comp={dataList[i]} />
    }
    return <div className={styles.itemList}>{listItems}</div>;
  };

  const getComponents = async () => {
    const URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components`
    const response = await fetch(URL, {
      headers : {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`
      }
    })
    let xjson = await response.json();
    let tmp = [];
    for(let i=0; i<xjson.length; i++) {
      tmp[i] = xjson[i];
    }
    setLoaded(true);
    setDataList(tmp);
  }

  React.useEffect(() => {
    getComponents();
  },[]);

  if(loaded)  return <GenerateList dataList={dataList} />;
  else return <Spinner />;
};
