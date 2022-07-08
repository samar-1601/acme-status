// lib
import * as React from "react";
import { useEffect, useState } from "react";

// components
import ComponentForm from "../internal/form/ComponentForm";

// constants
import IncidentErrorPage from "../../incidentError/IncidentErrorPage";
import { ComponentFormTombStoneLoader } from "../internal/form/TombStone";

const status = [
  "operational",
  "degraded_performance",
  "partial_outage",
  "major_outage",
  "under_maintenance",
];

/**
 * function to get component's data from its ID
 * @param componentId id of component for which we need to fetch data
 * @returns API response for component
 */
const getComponent = async (componentId: string) => {
  try {
    const URL = `https://api.statuspage.io/v1/pages/${process.env.NEXT_PUBLIC_PAGE_ID}/components/${componentId}`;
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    let xjson = await response.json();
    return [xjson, false];
  } catch (err) {
    console.log(err);
    return [[], true];
  }
};

/**
 * @returns Component form for edit component prefilled with component's data
 */
export default function EditComponent(props: any) {
  const [state, setState] = useState({
    isLoading: true,
    componentName: "",
    componentDescription: "",
    componentGroup: "",
    componentStatus: 0,
    uptime: false,
    isError: false,
  });

  const getComponentsData = async () => {
    const [data, isError] = await getComponent(props.componentId);
    setState({
      ...state,
      componentName: data?.name ?? "",
      componentDescription: data?.description ?? "",
      componentStatus: status.indexOf(data?.status) ?? "",
      componentGroup: data?.group_id ?? "",
      isError: isError,
      isLoading: false,
    });
  };

  useEffect(() => {
    getComponentsData();
  }, []);

  return state.isError ? (
    <IncidentErrorPage message="Sorry Unable to Fetch Data. Please Try Again!" />
  ) : state.isLoading ? (
    <ComponentFormTombStoneLoader type="Edit" />
  ) : (
    <ComponentForm
      id={props.componentId}
      addComponent={false}
      componentName={state.componentName}
      componentDescription={state.componentDescription}
      componentGroup={state.componentGroup}
      componentStatus={state.componentStatus}
      uptime={state.uptime}
    />
  );
}
