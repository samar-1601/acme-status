import { useEffect, useState } from "react";
import { NEXT_PUBLIC_AUTH_TOKEN } from "../../constants";

export default function LoadPageData(pageNumber: number, pageType: string) {
  const [dataList, setData] = useState<any[]>(Array());
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  let idList: string[] | undefined = [];

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
    if (idList !== undefined) {
      idList.forEach(getData);
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
    setData((prevDataItems) => {
      if (prevDataItems) return [...prevDataItems, ...dataItem];
      else return dataItem;
    });
    setHasLoaded(true);
  };

  useEffect(() => {
    setHasLoaded(false);
    getIDData();
  }, [pageNumber]);

  let data:any[] = Array() ;
  switch (pageType) {
    case "All":
      data =  dataList;
      break;
    case "Active":
      data =  dataList.filter(
        (data) =>
          data["status"] !== "resolved" && data["status"] !== "completed"
      );
      break;
    case "Maintainances":
      data =  dataList.filter((data) => data["impact"] === "maintenance");
      break;
  }
  return {"dataList": data, "isLoaded" :hasLoaded};
}
