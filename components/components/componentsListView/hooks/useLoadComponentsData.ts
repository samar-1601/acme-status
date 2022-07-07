// lib
import { useEffect, useState } from "react";

// constants
import { Page, PAGE_ID } from "../../../../constants";

/**
 * Loads uptime data for a component from API using component id
 * @returns API response and API loading status
 */
const getMsg = async (id: string) => {
  try {
    const URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components/${id}/uptime`;
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    let xjson = await response.json();
    if (!xjson.error) {
      const date1 = new Date(xjson.range_end);
      const date2 = new Date(xjson.range_start);
      let days = Math.ceil(
        Math.abs(date1.valueOf() - date2.valueOf()) / (1000 * 60 * 60 * 24)
      );

      return [
        String(xjson.uptime_percentage) +
          "% uptime in the past " +
          String(days) +
          " days",
        false,
      ];
    } else {
      return ["Uptime Data unavailable!", false];
    }
  } catch (err) {
    console.log("uptime data can't be fetched");
    throw err;
  }
};

/**
 * Get data components from API for a given pageID
 * @returns the data fetched from the API
 */
const getComponents = async () => {
  try {
    const URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components`;
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    let xjson = await response.json();
    let dataItem: any = [];
    for (let i = 0, j = 0; i < xjson.length; i++) {
      if(xjson[i].group == false){
        dataItem[j] = xjson[i];
        dataItem[j].msg = await getMsg(xjson[i].id);
        j++;
      }
    }
    console.log("here is dataitem", dataItem);
    const status: number = response.status;

    return [dataItem, status, false];
  } catch (err) {
    console.log(err);
    return [[], 500, true];
  }
};

/**
 * @returns List of Components after fetching from API
 */
export default function useLoadComponentsData(pageType: Page) {
  const [state, setState] = useState({
    dataList: Array(), // dataList : stores data response from API
    isLoading: true, // isLoading : status of loading data from API
    isError: false, // isError: Stores if fetch has error
    status: 200, // response status
  });

  /**
   * An asynchronous helper function which loads data from getData()
   * @param pageNumber current page number we are accessing
   * @param pageType current menu item/pageType selected
   */
  const LoadDataItems = async () => {
    try {
      setState({ ...state, isLoading: true });

      let dataList: any = [],
        responseStatus: number = 200,
        responseIsError = false;
      [dataList, responseStatus, responseIsError] = await getComponents();

      console.log("API data:", dataList.length, dataList);

      setState({
        ...state,
        isLoading: false, // loading completed
        dataList: dataList,
        isError: responseIsError,
        status: responseStatus,
      });
    } catch (err) {
      setState({
        ...state,
        isError: true,
      });
      console.log(err);
    }
  };

  /**
   * function to be called when fresh data is needed to be fetched again
   */
  const reFetch = async () => {
    await LoadDataItems();
  };

  useEffect(() => {
    setState({
      ...state,
      isLoading: true,
      isError: false,
      status: 200,
    }); // if new menu item selected, reset values for the future data to render
    LoadDataItems();
  }, [pageType]);

  return {
    dataList: state.dataList,
    isLoading: state.isLoading,
    reFetch: reFetch,
    isError: state.isError,
    status: state.status,
  };
}
