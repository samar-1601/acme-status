import { useEffect, useState } from "react";
import { ICON_URL, NEXT_PUBLIC_AUTH_TOKEN } from "../../constants";
import styles from "./styles.module.css";
import { Avatar } from "baseui/avatar";

const Item = function (props: any) {
  const [msg, setMsg] = useState("uptime data unavailable!");

  const getUptime = async () => {
    const URL = `https://api.statuspage.io/v1/pages/${props.comp.page_id}/components/${props.comp.id}/uptime`;
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
    }
  }

  useEffect(()=>{
    getUptime();
  },[]);

  return (
    <div className={styles.listItem}>
      <div>
        <Avatar 
          name={props.comp.status}
          src={ICON_URL[props.comp.status]}
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
      <div>
        <span className={styles.itemName}>{props.comp.name}</span><br/>
        <span className={styles.itemDescription}>{msg}</span>
      </div>
    </div>)
} 

export const GenerateList = function (props: any) {
  let dataList = props.dataList;

  let listItems = [];
  for (let i=0; i<dataList.length; i++) {
    listItems[i] = <Item key={dataList[i].id} comp={dataList[i]} />
  }

  return <div className={styles.itemList}>{listItems}</div>;
};
