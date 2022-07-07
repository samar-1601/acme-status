// lib
import { useEffect, useState } from "react";

// constants
import { PAGE_ID } from "../../../../../constants";

/**
 * Get a components' uptime value
 * @param componentID ID of the component for which we need uptime
 * @returns Uptime percentage for the component
 */
export const getComponentUptime = async (componentID: string) => {
  try {
    let URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components/${componentID}/uptime`;

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const dataItem: any = await response.json();
    return dataItem["uptime_percentage"];
  } catch (err) {
    console.log(err);
    return "";
  }
};

/**
 * get a list components
 * @returns Components list fetched from API
 */
export const getComponents = async () => {
  try {
    let URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components`;

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });

    const dataItem: any = await response.json();
    const status: number = response.status;

    let componentUptimeMap: any = new Map();

    for (const data of dataItem) {
      if (data.group == false) {
        const uptimeValue: string = await getComponentUptime(data["id"]);
        componentUptimeMap.set(data.id, uptimeValue);
      }
    }

    return [dataItem, componentUptimeMap, status, false];
  } catch (err) {
    console.log(err);
    return [[], null, 500, true];
  }
};

export default function useLoadAboutPageData() {
  const [state, setState] = useState({
    pureComponentsList: Array(), // dataList : stores data response from API
    componentGroupsMap: new Map(),
    componentGroupNamesMap: new Map(),
    componentUptimeMap: new Map(),
    isLoading: true, // isLoading : status of loading data from API
    isError: false, // isError: Stores if fetch has error
    status: 200, // response status
  });

  /**
   * helper function to load the components list by calling API functions
   */
  const LoadDataItems = async () => {
    try {
      let componentList: any = [],
        responseStatus: number = 200,
        componentUptimeMap: any = new Map(),
        responseIsError = false;

      [componentList, componentUptimeMap, responseStatus, responseIsError] =
        await getComponents(); // get components from API

      let pureComponents = [];

      let nameOfGroup = new Map();
      let groupsOfComponents = new Map();

      for (const component of componentList) {
        const groupID = component["group_id"];
        if (groupID != null) {
          let previous = [];
          if (groupsOfComponents.has(groupID))
            previous = groupsOfComponents.get(groupID);
          groupsOfComponents.set(groupID, previous.concat(component));
        }
        if (component.group == true) {
          nameOfGroup.set(component["id"], component.name);
        }
      }

      pureComponents = componentList
        .filter(function (itr: any) {
          if (itr.group == false && itr.group_id == null) {
            return true;
          }
          return false;
        })
        .map((item: any) => {
          return item;
        });

      setState({
        ...state,
        pureComponentsList: pureComponents,
        componentGroupNamesMap: nameOfGroup,
        componentGroupsMap: groupsOfComponents,
        componentUptimeMap: componentUptimeMap,
        isLoading: false,
        isError: responseIsError,
        status: responseStatus,
      }); // set the componentsList to returned render ready list and isLoaded to true
    } catch (err) {
      console.log(err);
      setState({ ...state, isError: true });
    }
  };

  useEffect(() => {
    setState({
      ...state,
      isLoading: true,
      isError: false,
      status: 200,
    }); // if new menu item selected, reset values for the future data to render
    LoadDataItems();
  }, []);

  return {
    pureComponentsList: state.pureComponentsList,
    componentGroupNamesMap: state.componentGroupNamesMap,
    componentGroupsMap: state.componentGroupsMap,
    componentUptimeMap: state.componentUptimeMap,
    isLoading: state.isLoading,
    isError: state.isError,
    status: state.status,
  };
}
