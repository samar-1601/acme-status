// lib
import { useEffect, useState } from "react";

// constants
import { NEXT_PUBLIC_AUTH_TOKEN, PageType, PAGE_ID } from "../../../constants";

/**
 * Loads data from API
 * @param pageNumber pageNumber required for paginated data
 * @param pageType type of page
 * @returns API response and API loading status
 */

// global variables
const limit = 15; // determines the no. of rows of data in a page

/**
 * Get data response from API for a given pageID
 * @param pageNumber page number for pagination
 * @param pageType type of the page to be rendered
 */
const getData = async (pageNumber: number, pageType: string) => {
  /**
   * The URL value is changed according to the PageType to get the desired response.
   */
  try {
    let URL;
    URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/incidents/?limit=${limit}&page=${pageNumber}`;
    if (pageType == PageType.Maintenance) {
      URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/incidents/active_maintenance/?per_page=${limit}&page=${pageNumber}`;
    } else if (pageType == PageType.Active) {
      URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/incidents/unresolved/?per_page=${limit}&page=${pageNumber}`;
    } else if (pageType == PageType.Scheduled) {
      URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/incidents/scheduled/?per_page=${limit}&page=${pageNumber}`;
    } 

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const dataItem = await response.json();

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
   * reset every value if the pageType has changed
   */
  useEffect(() => {
    setState({ hasLoaded: false, hasMore: true, dataList: [] });
    LoadDataItems(1, pageType);
  }, [pageType]);

  /**
   * An asynchronous helper function which loads data from getData()
   * @param pageNumber current page number we are accessing
   * @param pageType current menu item/pageType selected
   */
  const LoadDataItems = async (pageNumber: number, pageType: string) => {
    const dataItem = await getData(pageNumber, pageType);

    console.log(
      "pageNo:",
      pageNumber,
      "hasMore",
      dataItem.length > 0,
      "API data:",
      dataItem.length
    );
    /**
     * state.dataList : concat data obtained in the current response to previous datalist
     * state.hasLoaded : after all the above processes are done update the hasLoaded status
     * state.hasMore : if we get data in the current page, set hasMore to true
     */
    setState({
      ...state,
      hasLoaded: true,
      hasMore: dataItem.length > 0,
      dataList: pageNumber == 1 ? dataItem : (dataItem!=undefined)?[...state.dataList, ...dataItem]:[...state.dataList],
    });
  };

  /**
   * triggered when the pageNumber changes i.e we scroll below
   */
  useEffect(() => {
    if (pageNumber !== 1) {
      setState({ ...state, hasLoaded: false });
      LoadDataItems(pageNumber, pageType);
    }
  }, [pageNumber]);

  return {
    dataList: state.dataList,
    isLoaded: state.hasLoaded,
    hasMore: state.hasMore,
  };
}
