import { generateList } from "./generate_list";
import { useEffect, useState } from "react";
import { NEXT_PUBLIC_AUTH_TOKEN } from "../../constants";


const ListView = function () {
  const [dataList, setDataList] = useState([]);
  let idList=[];
  let pages: any;

  const getUpTimeStatus = async (pageId: string, componentId: string) => {
    const URL = `https://api.statuspage.io/v1/pages/${pageId}/components/${componentId}/uptime`;
    let component: any;

    const response = fetch(URL, {
      headers : {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`
      }
    })

    component = (await response).json();
    component = Promise.resolve(component);
    const date1 = new Date(component.range_end);
    const date2 = new Date(component.range_start);
    let days = Math.ceil(Math.abs(date1.valueOf()-date2.valueOf())/(1000*60*60*24));
    let stat = String(component.uptime_percentage)+"% uptime in the past "+String(days)+" days";
    console.log(stat);
    return stat;
  }

  const getComponentsPage = async (pageId : string) => {
    const URL = `https://api.statuspage.io/v1/pages/${pageId}/components`;
    const response = await fetch(URL, {
      headers : {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`
      }
    })
    const componentData = await response.json();
    return componentData;
  }

  const getPageID = async () => {
    const URL = "https://api.statuspage.io/v1/pages/"
    const response = await fetch(URL, {
      headers : {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`
      }
    })
    let xjson = await response.json();
    idList = xjson.map(data=>data.id);
    return idList;
  }

  const getComponents = async () => {
    pages = await getPageID();
    pages.forEach(async (page: string) => {
      let pageComponents = await getComponentsPage(page);
      setDataList([]);
      pageComponents.forEach(comp => {
        let m = Promise.resolve(getUpTimeStatus(comp.page_id, comp.id));
        console.log(m);
      });
      setDataList(dataList.concat(pageComponents));
    });
  }

  useEffect(() => {
    getComponents();
  },[]);

  console.log(dataList)
  
  return <>{generateList(dataList)}</>;
};

export default ListView;