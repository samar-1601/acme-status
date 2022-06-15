// lib
import { useEffect, useState, useRef, useCallback } from "react";
import * as React from "react";

// helper functions
import useLoadPageData from "./LoadPageData";

// components
import { renderData } from "./HelperFunctions";
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
import { PageType } from "../../../constants";

interface Props {
  pageType: PageType; // type of page(the selected navigation menu item) to be displayed
}

/**
 * List-view for the data as selected from the navigation bar
 * @param { enum.<PageType> } pageType Type of the page to be displayed
 * @returns A list of JSX Elements with data obtained from the API response
 */
export const IncidentsList: React.FC<Props> = React.memo(({ pageType }) => {
  const [pageNumber, setPageNumber] = useState<number>(1); // stores the page number for infinite scrolling and data-fetching
  const [pageLoaded, setPageLoaded] = useState<boolean>(false); // boolean value determining the status of API resquest (completed/not completed)
  
  const cache = useRef(
    new CellMeasurerCache({ // react-virtualized component to measure the size of component
      fixedWidth: true,
      defaultHeight: 50,
    })
  );

  /**
   * API response
   * dataList : JSON response for the limit(currently 15) items in the current pageNumber
   * isLoaded : whether the data has loaded or not from the API
   * hasMore : is there more data to fetch when we scroll
   */
  const { dataList, isLoaded, hasMore } = useLoadPageData(pageNumber, pageType);

  /**
   * triggered when the data is loaded from the API
   * sets pageLoaded for the current page (for the loading spinner)
   */
  useEffect(() => {
    if (dataList.length>0) {
      return setPageLoaded(true);
    }
  }, [isLoaded]);

  /**
   * Triggered when the PageType changes
   * initializes every value so that data from previous menus doesn't affect the data on current page
   */
  useEffect(() => {
    setPageLoaded(false);
    setPageNumber(1);
  }, [pageType]);

  /**
   * The functions triggers more data to load by changing the pageNumber's state and hence triggering the above useEffects
   */
  const fetchMoreData = useCallback(() => {
    setPageNumber((page) => page + 1);
  }, []);

  /**
   * Triggers more loading of data for infinite scrolling
   * @param param the startIndex and endIndex of rows
   * @returns the loaded data to show in infinite scrolling
   */
  const loadMoreRows = useCallback(
    (param: any) => {
      const startIndex = param.startIndex; // default from react-virtualised : the start index for the rendering datList
      const stopIndex = param.stopIndex; // default from react-virtualised : the end index for the rendering datList

      const dataLoaded = []; // a list storing data to be displayed from the start to the end indices
      for (let i = startIndex; i < stopIndex; i++) {
        dataLoaded[i] = dataList[i];
      }
      fetchMoreData(); // call fetchMoreData to increase pageNumber by 1
      return Promise.resolve(dataLoaded); // typecasting the data as we have made dataLoaded 
      // array using pre-existing data and not calling more from API
    },
    [pageNumber]
  );

  /**
   * AutoSizer : enables the auto sizing of the child elements based on their size
   * List : enables virtualization by populating the DOM with only the rows which are seen on screen
   * CellMeasurer : tells the size of the element
   */
  return pageLoaded ? (
    <InfiniteLoader
      isRowLoaded={({ index }) => !hasMore || index < dataList.length} // whether the current row is loaded
      loadMoreRows={loadMoreRows} // function triggered when we scroll and need more data to load
      rowCount={dataList.length + 1} // total row count of the data to be displayed
    >
      {({ onRowsRendered, registerChild }) => (
        <div style={{ width: "100%", height: `calc(100vh - 160px)` }}>
          <AutoSizer>
            {({ width, height }) => (
              <List
                width={width}
                height={height}
                onRowsRendered={onRowsRendered}
                ref={registerChild}
                rowHeight={cache.current.rowHeight}
                deferredMeasurementCache={cache.current}
                rowCount={dataList.length}
                rowRenderer={({ key, index, style, parent }) => {
                  const element = dataList[index];
                  return (
                    <CellMeasurer
                      key={key}
                      cache={cache.current}
                      parent={parent}
                      columnIndex={0}
                      rowIndex={index}
                    >
                      <div style={style}>{renderData(element)}</div>
                    </CellMeasurer>
                  );
                }}
              ></List>
            )}
          </AutoSizer>
        </div>
      )}
    </InfiniteLoader>
  ) : (
    <Block
      overrides={{
        Block: {
          style: {
            marginTop: "35vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      }}
    >
      <Spinner />
    </Block>
  );
});
