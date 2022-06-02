import { useEffect, useState } from "react";
import { NEXT_PUBLIC_AUTH_TOKEN } from "../../constants";

export const LoadPageData = (pageNumber:string) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  // getting the page ids for the next call
  const [dataList, setData] = useState([]);
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
    setData(myJson);
    idList = myJson.map((data: any) => data["id"]);
    if (idList !== undefined) {
      idList.forEach(getData);
    }
  };

  const getData = async (pageId: string) => {
    const URL = `https://api.statuspage.io/v1/pages/${pageId}/incidents/?limit=5&page=${pageNumber}`;
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const dataItem = await response.json();
    setData(dataItem);
    setHasLoaded(true);
  };
  return {dataList, pageNumber};
};
