import { GenerateList } from "./generate_list";
import { useEffect, useState } from "react";
import { NEXT_PUBLIC_AUTH_TOKEN } from "../../constants";
import { tmpdir } from "os";

let stat = "uptime data unavailable!";

const ListView = function () {
  const [dataList, setDataList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  let idList=[];
  let pages: any;

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
    pages = await  getPageID();
    let urls = pages.map(page => {
      return `https://api.statuspage.io/v1/pages/${page}/components`;
    })

    let tmp=[];
    let j=0;
    await Promise.all(
      urls.map(async (url: string) => fetch(url, {
        headers : {
          "Content-Type": "application/json",
          Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`
        }
      })
      .then(res => res.json())
      .then(data=>{
        for(let i=0; i<data.length; i++)  {
          tmp[j++]=(data[i]);
        }
      })
    ))
    setLoaded(true);
    setDataList(tmp);
  }

  useEffect(() => {
    getComponents();
  },[]);


    if(loaded)  return <GenerateList dataList={dataList} />;
    else return <>No items</>;

};

export default ListView; 