// lib
import * as React from "react";
import { useEffect, useState } from "react";

// components
import { Block } from "baseui/block";
import { TombStoneLoader } from "../TombStoneLoader";
import IncidentErrorPage from "../../../../incidentError/IncidentErrorPage";
import { RenderComponentsList } from "./RenderComponentsList";

// styles
import { LOADER } from "../../overrides/componentListStyles";

// constants
import { Page } from "../../../../../constants";

// hooks
import useLoadComponentsData from "../../hooks/useLoadComponentsData";

interface Props {
  pageType: Page;
}
export const ComponentList = function (props: Props) {
  const [pageLoaded, setPageLoaded] = useState<boolean>(false); // boolean value determining the status of API request (completed/not completed)

  /**
   * API response
   * dataList : JSON response for the limit(currently 15) items in the current pageNumber
   * isLoading : whether the data has loaded or not from the API
   * isError : is there error in loading
   * status : get the response status from API call
   */
  const { dataList, isLoading, reFetch, isError, status } =
    useLoadComponentsData(props.pageType);

  useEffect(() => {
    if (!isLoading) {
      setPageLoaded(true);
    }
  }, [isLoading]);

  if (isError)
    return <IncidentErrorPage message="Sorry Unable to Fetch Components" />;
  else if (status == 420) {
    return (
      <IncidentErrorPage message="Too Many requests, try again after sometime!" />
    );
  } else if (pageLoaded)
    return (
      <RenderComponentsList
        dataList={dataList}
        setLoaded={setPageLoaded}
        reFetch={reFetch}
      />
    );
  else
    return (
      <Block overrides={LOADER}>
        <TombStoneLoader />
      </Block>
    );
};
