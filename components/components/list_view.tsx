import { GenerateList } from "./generate_list";
import { useEffect, useState } from "react";
import { NEXT_PUBLIC_AUTH_TOKEN } from "../../constants";

let stat = "uptime data unavailable!";

const ListView = function () {
  const [dataList, setDataList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  let idList=[];
  let pages: any;

  const getComponentsFromPage = async (pageId : string) => {
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
    let tmp = [];
    pages.forEach(async (page: string) => {
      let pageComponents = await getComponentsFromPage(page);
      let i: number=0;
      pageComponents.forEach((comp: any) => {
        tmp[i++]=comp;
      })
    });
    setDataList(tmp);
  }

  useEffect(() => {
    if(dataList.length>0) setLoaded(true);
    else {
      getComponents();
    }
  },[]);


  if(loaded)  return <GenerateList dataList={dataList} />;
  else return <>No items</>;

};

export default ListView;