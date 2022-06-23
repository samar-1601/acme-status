import * as React from "react";

import { ICON_URL, NEXT_PUBLIC_AUTH_TOKEN, PAGE_ID } from "../../constants";

import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";
import { Button, SIZE } from "baseui/button";
import { Spinner } from "baseui/spinner";
import { Avatar } from "baseui/avatar";
import styles from "./styles.module.css"

import Link from "next/link";

import { useRouter } from "next/router";

export const ComponentList = function () {
  const router = useRouter()
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
    details = (<>
                <div className={styles.itemName}>{props.comp.name}</div><br />
                <div className={styles.itemDescription}>{msg}</div>
              </>);

    return (
      <div className={styles.element}>
        <div className={styles.listItem}>
          <StatefulPopover
            content={<>{props.comp.status}</>}
            accessibilityType={'tooltip'}
            triggerType={TRIGGER_TYPE.hover}
          >
          <span>
            <Avatar 
              name = {props.comp.status}
              src = {ICON_URL[props.comp.status]}
              size="scale600"
              overrides = {{
                Root: {
                  style: {
                    paddingTop: "2px",
                    paddingRight: "12px",
                  }
                }
              }}
            >
            </Avatar>
          </span>
          </StatefulPopover>
          <div>{details}</div>
        </div>
        <div>
          <Link
            href={{
              pathname: `/component/edit`,
              query: {id: props.comp.id}
            }}
          >
            <Button 
              size={SIZE.compact}
              overrides ={{
                BaseButton : {
                  style : {
                    backgroundColor: "white",
                    color: "black",
                    alignSelf: "right",
                    justifyContent: "right",
                    borderBlock: "#E6E6E9"
                  },
                  props : {
                    className: "add-button"
                  }
                }
              }} 
              >Edit
            </Button>
          </Link>
        </div>
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
  else return <div className={styles.loader}><Spinner /></div>;
};
