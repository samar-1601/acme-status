// lib
import { useCallback, useEffect, useState } from "react";

/**
 * @returns list of completed incidents in the given PAGE_ID
 */
const getPastIncidents = async () => {
  try {
    let URL = `https://api.statuspage.io/v1/pages/${process.env.PAGE_ID}/incidents/?q=completed+resolved`;

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const completedList = await response.json();
    const status: number = response.status;

    return [completedList, status, false];
  } catch (err) {
    console.log(err);
    return [[], 500, true];
  }
};

/**
 * Custom hook which returns data, response status and loading status from API fetching
 */
export default function useLoadPastIncidents() {
  const [state, setState] = useState({
    dataList: Array(), // dataList : stores data response from API
    isLoading: true, // isLoading : status of loading data from API
    isError: false, // isError: Stores if fetch has error
    status: 200, // response status
  });

  /**
   * Helper function to get JSX components from API data
   * @returns a JSX componentList ready to render after styling the API response
   */
  const loadComponentsList = useCallback(async () => {
    try {
      let pastIncidentsList = [],
        responseStatus: number = 200,
        responseIsError = false;
      [pastIncidentsList, responseStatus, responseIsError] =
        await getPastIncidents();

      /**
       * isLoaded : To notify the loading spinner whether data has loaded
       * dataList : List storing the JSX components to render when data has loaded.
       */
      setState({
        ...state,
        dataList: pastIncidentsList,
        isLoading: false,
        isError: responseIsError,
        status: responseStatus,
      });
    } catch (err) {
      setState({ ...state, isError: true });
      console.log(err);
    }
  }, []);

  useEffect(() => {
    setState({
      ...state,
      isLoading: true,
      isError: false,
      status: 200,
    });
    loadComponentsList();
  }, []);

  return {
    dataList: state.dataList,
    isLoading: state.isLoading,
    isError: state.isError,
    status: state.status,
  };
}
