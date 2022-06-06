import { useEffect, useState } from "react";
import { NEXT_PUBLIC_AUTH_TOKEN } from "../../constants";

/**
 * Loads data from API
 * @param pageNumber pageNumber required for paginated data
 * @param pageType type of page
 * @returns API response and API loading status
 */
export default function LoadPageData(pageNumber: number, pageType: string) {

  const [dataList, setData] = useState<any[]>(Array()); // stores data response from API
  const [hasLoaded, setHasLoaded] = useState<boolean>(false); // status of loading data from API
  const [hasMore, setHasMore] = useState<boolean>(true); // do we have to fetch more data

  let idList: string[] | undefined = []; // list of pageIDs from which we will be fetching data from

  /**
   * Get the ID list from API and then call for data in each page
   * @param pageNumber pageNumber for getting paginated data
   */
  const getIDData = async (pageNumber: number) => {
    try{
    const URL = "https://api.statuspage.io/v1/pages";
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const myJson = await response.json();
    idList = myJson.map((data: any) => data["id"]);
  }
  catch(err){
    alert('Too many API calls');
    console.log(err);
  }

    // call getData for each pageID
    if (idList !== undefined) {
      for (let i = 0; i < idList.length; i++) {
        getData(idList[i], pageNumber);
      }
    }
  };

  /**
   * Get data response from API for a given pageID
   * @param pageId ID of the page from which we need to fetch data from
   * @param pageNumber page number for pagination
   */
  const getData = async (pageId: string, pageNumber: number) => {
    try{
    const URL = `https://api.statuspage.io/v1/pages/${pageId}/incidents/?limit=10&page=${pageNumber}`;
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const dataItem = await response.json();
  }
  catch(err){
    alert("Multiple API calls");
    console.log(err);
  }

    console.log(
      "pageNo:",
      pageNumber,
      "hasMore",
      dataItem.length > 0,
      "API data:",
      dataItem.length
    );

    /**
     * concat data obtained in the current response to previous datalist
     */
    setData((prevDataItems) => {
      return pageNumber == 1 ? dataItem : [...prevDataItems, ...dataItem];
    });

    setHasMore(dataItem.length > 0); // if we get data in the current page, set hasMore to true
    setHasLoaded(true); // after all the above processes are done update the hasLoaded status
  };

  /**
   * triggered when the pageNumber changes i.e we scroll below
   */
  useEffect(() => {
    if (pageNumber !== 1) {
      setHasLoaded(false);
      getIDData(pageNumber);
    }
  }, [pageNumber]);

  /**
   * reset every value if the pageType has changed
   */
  useEffect(() => {
    setHasLoaded(false);
    setHasMore(true);
    setData([]);
    getIDData(1);
  }, [pageType]);

  return { dataList: dataList, isLoaded: hasLoaded, hasMore: hasMore };
}
