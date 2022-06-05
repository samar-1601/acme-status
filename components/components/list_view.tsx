import { generateList } from "./generate_list";
import { useEffect, useState } from "react";
import { NEXT_PUBLIC_AUTH_TOKEN } from "../../constants";

const ListView = function () {
  let idList=[];
  const [dataList, setDataList] = useState([]);

  const getUpTime = async (pageId: string, componentId: string) => {
    const URL = `https://api.statuspage.io/v1/pages/${pageId}/components/${componentId}/uptime`;
    const response = await fetch(URL, {
      headers : {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`
      }
    })
    const json = response.json;
    console.log(json["uptime_percentage"]);
  }

  const getData = async (pageId : string) => {
    const URL = `https://api.statuspage.io/v1/pages/${pageId}/components`;
    const response = await fetch(URL, {
      headers : {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`
      }
    })
    const componentData = await response.json();
    setDataList(componentData);
  }

  const getComponents = async () => {
    const URL = "https://api.statuspage.io/v1/pages/"
    const response = await fetch(URL, {
      headers : {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`
      }
    })
    let xjson = await response.json();
    idList = xjson.map((data: any) => {
      return data["id"];
    })
    if(idList !== undefined) {
      idList.forEach(id => {
        getData(id);
      });
    }
  }

  useEffect(() => {
    getComponents();
  });
  return <>{generateList(dataList)}</>;
};

export default ListView;
