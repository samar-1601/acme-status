import * as React from "react";

import { ComponentStatusIconUrls, PAGE_ID } from "../../../../constants";

import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";
import { Spinner } from "baseui/spinner";
import Image from "next/image";

import Link from "next/link";

import { Block } from "baseui/block";
import { detailStyles, element, listItem, loader } from "../overrides/componentListStyles";

export const ComponentList = function (props: any) {
  const [dataList, setDataList] = React.useState<any>([]);
  const [loaded, setLoaded] = React.useState(false);
  
  const Component = function (props: any) {
    const [msg, setMsg] = React.useState("");

    let details: any;
    details = (<>
                <Block >{props.comp.name}</Block>
                <Block {...detailStyles}>{props.msg}</Block>
              </>);

    return (
      <Block {...element}>
        <Block {...listItem}>
          <StatefulPopover
            content={<>{props.comp.status}</>}
            accessibilityType={'tooltip'}
            triggerType={TRIGGER_TYPE.hover}
          >
          <Block overrides={{
            Block: {
              style: {
                marginRight: "8px",
                marginTop: "2px",
              }
            }
          }}>
            <Image // NextJS component for rendering Image
              src={ComponentStatusIconUrls(props.comp.status)} // get the src address for the component based on its status
              height="16px"
              width="16px"
            ></Image>
          </Block>
          </StatefulPopover>
          <div>{details}</div>
        </Block>
        <div>
          <Link
        href={{
          pathname: `/component/edit/${props.comp.id}`,
        }}
      >
            <Block 
              overrides ={{
                Block : {
                  style : {
                    padding: "0px 16px",
                    width: "92px",
                    height: "34px",
                  },
                  props : {
                    className: "secondary-button"
                  }
                }
              }} 
              >Edit
            </Block>
          </Link>
        </div>
      </Block>)
  };

  const GenerateList = function (props: any) {
    let dataList = props.dataList;
    let listItems = [];
    for (let i=0; i<dataList.length; i++) {
      listItems[i] = <Component key={dataList[i].id} comp={dataList[i]} msg={dataList[i].msg}/>
    }
    return <Block >{listItems}</Block>;
  };

  const getMsg = async (id: string) => {
    const URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components/${id}/uptime`;
    const response = await fetch(URL, {
      headers : { 
        "Content-Type": "application/json",
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`
      }
    })
    let xjson = await response.json();
    if(!xjson.error) {
      const date1 = new Date(xjson.range_end);
      const date2 = new Date(xjson.range_start);
      let days = Math.ceil(Math.abs(date1.valueOf()-date2.valueOf())/(1000*60*60*24));
      return (String(xjson.uptime_percentage)+"% uptime in the past "+String(days)+" days");
    } else {
      return "Uptime Data unavailable!"
    }
  }

  const getComponents = async () => {
    const URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components`
    const response = await fetch(URL, {
      headers : {
        "Content-Type": "application/json",
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`
      }
    })
    let xjson = await response.json();
    let tmp = [];
    for(let i=0; i<xjson.length; i++) {
      tmp[i] = xjson[i];
      tmp[i].msg = await getMsg(xjson[i].id);
    }
    setLoaded(true);
    setDataList(tmp);
  }

  React.useEffect(() => {
    getComponents();
  },[]);

  if(loaded)  return <GenerateList dataList={dataList} />;
  else return <Block {...loader}><Spinner /></Block>;
};
