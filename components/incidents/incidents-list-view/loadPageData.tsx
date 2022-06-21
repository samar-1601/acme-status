// lib
import { useCallback, useEffect, useState } from "react";

// constants
import { NEXT_PUBLIC_AUTH_TOKEN, PageType } from "../../../constants";

/**
 * Loads data from API
 * @param pageNumber pageNumber required for paginated data
 * @param pageType type of page
 * @returns API response and API loading status
 */

// global variables
let pageIDsList: string[] | undefined = []; // list of pageIDs from which we will be fetching data from
const limit = 15; // determines the no. of rows of data in a page

/**
 * Get data response from API for a given pageID
 * @param pageId ID of the page from which we need to fetch data from
 * @param pageNumber page number for pagination
 * @param pageType type of the page to be rendered
 */
const getData = async (
  pageId: string,
  pageNumber: number,
  pageType: string
) => {
  /**
   * The URL value is changed according to the PageType to get the desired response.
   */
  try {
    let URL;
    URL = `https://api.statuspage.io/v1/pages/${pageId}/incidents/?limit=${limit}&page=${pageNumber}`;
    if (pageType == PageType.Maintenance) {
      URL = `https://api.statuspage.io/v1/pages/${pageId}/incidents/active_maintenance/?per_page=${limit}&page=${pageNumber}`;
    } else if (pageType == PageType.Active) {
      URL = `https://api.statuspage.io/v1/pages/${pageId}/incidents/unresolved/?per_page=${limit}&page=${pageNumber}`;
    } else if (pageType == PageType.Scheduled) {
      URL = `https://api.statuspage.io/v1/pages/${pageId}/incidents/scheduled/?per_page=${limit}&page=${pageNumber}`;
    }

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const dataItem = await response.json();

    console.log(
      "pageNo:",
      pageNumber,
      "hasMore",
      dataItem.length > 0,
      "API data:",
      dataItem.length
    );
    return dataItem;
  } catch (err) {
    console.log(err);
    alert("Too many API calls");
  }
};

export default function useLoadPageData(pageNumber: number, pageType: string) {
  /**
   * A useState storing:
   * dataList : stores data response from API
   * hasLoaded : status of loading data from API
   * hasMore : do we have to fetch more data
   */
  const [state, setState] = useState({
    dataList: Array(),
    hasLoaded: false,
    hasMore: true,
  });

  /**
   * Get the ID list from API and then call for data in each page
   * @param pageNumber pageNumber for getting paginated data
   * @param pageType type of page to be rendered
   */
  const getIDData = useCallback(
    async (pageNumber: number, pageType: string) => {
      try {
        const URL = "https://api.statuspage.io/v1/pages";
        const response = await fetch(URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
          },
        });
        const myJson = await response.json();
        pageIDsList = myJson.map((data: any) => data["id"]);
      } catch (err) {
        alert("Too many API calls");
        console.log(err);
      }

      // call getData for each pageID
      if (pageIDsList !== undefined) {
        for (let i = 0; i < pageIDsList.length; i++) {
          const dataItem = await getData(pageIDsList[i], pageNumber, pageType);
          /**
           * state.dataList : concat data obtained in the current response to previous datalist
           * state.hasLoaded : after all the above processes are done update the hasLoaded status
           * state.hasMore : if we get data in the current page, set hasMore to true
           */
          setState({
            ...state,
            hasLoaded: true, //
            hasMore: dataItem.length > 0, //
            dataList:
              pageNumber == 1 ? dataItem : [...state.dataList, ...dataItem],
          });
        }
      }
    },
    [pageType, pageNumber]
  );

  /**
   * triggered when the pageNumber changes i.e we scroll below
   */
  useEffect(() => {
    if (pageNumber !== 1) {
      setState({ ...state, hasLoaded: false });
      getIDData(pageNumber, pageType);
    }
  }, [pageNumber]);

  /**
   * reset every value if the pageType has changed
   */
  useEffect(() => {
    setState({ hasLoaded: false, hasMore: true, dataList: [] });
    getIDData(1, pageType);
  }, [pageType]);

  return {
    dataList: state.dataList,
    isLoaded: state.hasLoaded,
    hasMore: state.hasMore,
  };
}
