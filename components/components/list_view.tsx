import { generateList } from "./generate_list";
import { useEffect, useState } from "react";
import { NEXT_PUBLIC_AUTH_TOKEN } from "../../constants";

let stat = "uptime data unavailable!";

const ListView = function () {
  const [dataList, setDataList] = useState([]);
  let idList=[];
  let pages: any;

  const getUpTimeStatus = async (pageId: string, componentId: string) => {
    const URL = `https://api.statuspage.io/v1/pages/${pageId}/components/${componentId}/uptime`;

    fetch(URL, {
      headers : {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`
      }
    })
    .then(response => response.json())
    .then(response => {
      stat = "uptime data unavailable!";
      if(!response.error)
      {
        const date1 = new Date(response.range_end);
        const date2 = new Date(response.range_start);
        let days = Math.ceil(Math.abs(date1.valueOf()-date2.valueOf())/(1000*60*60*24));
        stat = String(response.uptime_percentage)+"% uptime in the past "+String(days)+" days";
      }
      console.log(stat)
      return stat;
    })
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
      let tmp = [];
      let i=0;
      pageComponents.forEach(comp => {
        const URL = `https://api.statuspage.io/v1/pages/${comp.page_id}/components/${comp.id}/uptime`;

        fetch(URL, {
          headers : {
            "Content-Type": "application/json",
            Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`
          }
        })
        .then(response => response.json())
        .then(response => {
          comp.description = "uptime data unavailable!";
          if(!response.error) {
            const date1 = new Date(response.range_end);
            const date2 = new Date(response.range_start);
            let days = Math.ceil(Math.abs(date1.valueOf()-date2.valueOf())/(1000*60*60*24));
            comp.description = String(response.uptime_percentage)+"% uptime in the past "+String(days)+" days";
          }
        });
        tmp[i++]=comp;
      })
      setDataList(tmp);
    });
  }

  useEffect(() => {
    getComponents();
  },[]);

  console.log(dataList)
  return <>{generateList(dataList)}</>;
};

export default ListView;