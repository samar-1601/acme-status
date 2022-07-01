// lib
import { useEffect, useState, useRef } from "react";
import * as React from "react";

// helper functions
import useLoadPageData from "../hooks/useLoadPageData";

// components
import { RenderIncidentData } from "./IncidentListItem";
import { Spinner } from "baseui/spinner";
import { Block } from "baseui/block";
import {
  InfiniteLoader,
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import "react-virtualized/styles.css";

// constants
import { PageType } from "../../../../constants";
import { LOADER_OVERRIDES } from "../overrides/listStyles";
import { useSnackbar } from "baseui/snackbar";
import { TombStoneLoader } from "./TombStoneLoader";
import IncidentErrorPage from "../../../incidentError/IncidentErrorPage";

interface Props {
  /**
   * type of page(the selected navigation menu item) to be displayed
   */
  pageType: PageType;
}

/**
 * List-view for the data as selected from the navigation bar
 * @param { enum.<PageType> } pageType Type of the page to be displayed
 * @returns A list of JSX Elements with data obtained from the API response
 */
export const IncidentsList: React.FC<Props> = React.memo(({ pageType }) => {
  // const [pageNumber, setPageNumber] = useState<number>(1); // stores the page number for infinite scrolling and data-fetching
  const [pageLoaded, setPageLoaded] = useState<boolean>(false); // boolean value determining the status of API resquest (completed/not completed)
  const { enqueue, dequeue } = useSnackbar();
  const cache = useRef(
    new CellMeasurerCache({
      // react-virtualized component to measure the size of component
      fixedWidth: true,
      defaultHeight: 50,
    })
  );

  /**
   * API response
   * dataList : JSON response for the limit(currently 15) items in the current pageNumber
   * isLoading : whether the data has loaded or not from the API
   * hasMore : is there more data to fetch when we scroll
   */
  const { dataList, isLoading, hasMore, fetchMore, reFetch, isError } =
    useLoadPageData(pageType);

  /**
   * triggered when the data is loaded from the API
   * sets pageLoaded for the current page (for the loading spinner)
   */
  useEffect(() => {
    // if page has loaded
    if (!isLoading) {
      return setPageLoaded(true);
    }
  }, [isLoading]);

  /**
   * Triggered when the PageType changes i.e when the user clicks another navigation bar item
   * Initialises pageLoaded to false
   */
  useEffect(() => {
    setPageLoaded(false);
  }, [pageType]);

  /**
   * AutoSizer : enables the auto sizing of the child elements based on their size
   * List : enables virtualization by populating the DOM with only the rows which are seen on screen
   * CellMeasurer : tells the size of the element
   */
  if (isError) {
    return <IncidentErrorPage message="Sorry Unable to Fetch Incidents" />;
  } else
    return pageLoaded ? (
      // if page has Loaded
      dataList.length == 0 ? (
        // If the page has no data
        <Block overrides={LOADER_OVERRIDES}>
          {" "}
          This Page has no Incidents !!
        </Block>
      ) : (
        // If the page has loaded and has data to display
        <InfiniteLoader
          isRowLoaded={({ index }) =>
            !hasMore || index < (dataList.length ?? 0)
          } // whether the current row is loaded
          loadMoreRows={() => fetchMore()} // function triggered when we scroll and need more data to load
          rowCount={dataList.length + 1} // total row count of the data to be displayed
        >
          {({ onRowsRendered, registerChild }) => (
            <div style={{ width: "100%", height: `calc(100vh - 156px)` }}>
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    width={width}
                    height={height}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    rowHeight={cache.current.rowHeight ?? 0}
                    deferredMeasurementCache={cache.current}
                    rowCount={dataList.length ?? 0}
                    rowRenderer={({ key, index, style, parent }) => {
                      const element = dataList[index];
                      return (
                        <CellMeasurer
                          key={key}
                          cache={cache.current}
                          parent={parent}
                          columnIndex={0}
                          rowIndex={index ?? 0}
                        >
                          <div style={style}>
                            <RenderIncidentData
                              incident={element}
                              enqueue={enqueue}
                              reFetch={reFetch}
                            />
                          </div>
                        </CellMeasurer>
                      );
                    }}
                  ></List>
                )}
              </AutoSizer>
            </div>
          )}
        </InfiniteLoader>
      )
    ) : (
      // if page has not loaded
      <TombStoneLoader />
    );
});
