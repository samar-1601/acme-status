// lib
import { useEffect, useRef, useState } from "react";

// constants
import {
  PageType,
  PAGE_ID,
} from "../../../../constants";

/**
 * Loads data from API
 * @param pageNumber pageNumber required for paginated data
 * @param pageType type of page
 * @returns API response and API loading status
 */

const limit = 15; // determines the no. of rows of data in a page

/**
 * Get data response from API for a given pageID
 * @param pageNumber page number for pagination
 * @param pageType type of the page to be rendered
 * @returns the data fetched from the API
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
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });

    const dataItem = await response.json();

    return dataItem;
  } catch (err) {
    console.log(err);
  }
};

export default function useLoadPageData(pageType: PageType) {
  const [state, setState] = useState({
    dataList: Array(), // dataList : stores data response from API
    hasLoaded: false, // hasLoaded : status of loading data from API
    hasMore: true, // hasMore : do we have to fetch more data
    pageNumber: 1, // pageNumber : page number for pagination
  });

  /**
   * An asynchronous helper function which loads data from getData()
   * @param pageNumber current page number we are accessing
   * @param pageType current menu item/pageType selected
   */
  const LoadDataItems = async (pageNumber: number, pageType: string) => {
    let dataItem = [];
    try {
      dataItem = await getData(pageNumber, pageType);

      console.log(
        "pageNo:",
        pageNumber,
        "hasMore",
        dataItem.length > 0,
        "API data:",
        dataItem.length
      );

      setState({
        ...state,
        pageNumber: pageNumber,
        hasLoaded: true, // loading completed
        hasMore: dataItem.length == limit, // if page limit is reached we may have more data on the next page
        dataList: pageNumber == 1 ? dataItem : [...state.dataList, ...dataItem], // concat data obtained in the current response to previous datalist
      });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * function to be called when more data is needed to be fetched
   */
  const fetchMore = async () => {
    if (state.hasMore) {
      await LoadDataItems(state.pageNumber + 1, pageType); // fetch data for the next page (currentPage + 1)
    }
  };

  useEffect(() => {
    setState({ ...state, hasLoaded: false, pageNumber: 1 }); // if scrolled below, set hasLoaded as false for the future data to render
    LoadDataItems(1, pageType);
  }, [pageType]);

  return {
    dataList: state.dataList,
    isLoaded: state.hasLoaded,
    hasMore: state.hasMore,
    fetchMore: fetchMore,
  };
}
