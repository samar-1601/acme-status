import { useEffect, useState } from "react";
import { NEXT_PUBLIC_AUTH_TOKEN } from "../../constants";

export default function LoadPageData(pageNumber: number, pageType: string) {
  
  const [dataList, setData] = useState<any[]>(Array());
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  let idList: string[] | undefined = [];
  console.log("inside getData module: --------");
  console.log(pageNumber);
  const getIDData = async () => {
    const URL = "https://api.statuspage.io/v1/pages";
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const myJson = await response.json();
    idList = myJson.map((data: any) => data["id"]);
    console.log(idList);
    if (idList !== undefined) {
      for(let i=0; i<idList.length; i++)
      {
        getData(idList[i]);
      }
    }
  };

  const getData = async (pageId: string) => {
    const URL = `https://api.statuspage.io/v1/pages/${pageId}/incidents/?limit=10&page=${pageNumber}`;
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const dataItem = await response.json();

    console.log("inside function+++")

    setData((prevDataItems) => {
      console.log(prevDataItems);
      // if (prevDataItems) 
      return [...prevDataItems, ...dataItem];
      // else return dataItem;
    });

    setHasLoaded(true);
  };

  console.log(dataList);

  useEffect(() => {
    setHasLoaded(false);
    getIDData();
  }, [pageNumber]);

  console.log("outside getdata module-------");
  
  return { dataList: dataList, isLoaded: hasLoaded };
}
