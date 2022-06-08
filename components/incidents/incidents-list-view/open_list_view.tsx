import styles from "./styles/styles.module.css";
import useLoadPageData from "./loadPageData";
import { useEffect, useState, useRef } from "react";
import { PageType } from "./incident_list_view";
import { renderListData } from "./helperFunctions";

import { Spinner } from "baseui/spinner";

import {
  InfiniteLoader,
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import 'react-virtualized/styles.css'; 


interface Props {
  pageType: PageType;
}

/**
 * Previous API response's length
 * @type { number }
 * @global
 */
let prevDataLength: number = 0;

/**
 * List-view for the data as selected from the navigation bar
 * @param { enum.<PageType> } pageType Type of the page to be displayed
 * @returns A list of JSX Elements with data obtained from the API response
 */
export const OpenListView: React.FC<Props> = ({ pageType }) => {
  const [pageNumber, setPageNumber] = useState<number>(1); // stores the page number for infinite scrolling and data-fetching
  const [pageLoaded, setPageLoaded] = useState<boolean>(false); // boolean value determining the status of API resquest (completed/not completed)
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 50,
    })
  );

  /**
   * API response
   * dataList : JSON response for the 10 items the current pageNumber
   */
  const { dataList, isLoaded, hasMore } = useLoadPageData(pageNumber, pageType);

  /**
   * triggered when the data is loaded from the API
   */
  useEffect(() => {
    /**
     * Check if we need to fetch more data for the next page
     * Conditions:  If the current data has loaded
     *            + we need more data to call for next page
     *            + the current items in the page are not 10
     */
    const fetchMore =
      isLoaded &&
      hasMore &&
      (dataList.length === prevDataLength || dataList.length < 10);

    /**
     * if more data needs to be loaded, fetch more from the API
     */
    if (fetchMore) {
      return fetchMoreData();
    }

    /**
     * Set the data for the current page
     */
    const setData =
      (dataList.length > 0 && dataList.length !== prevDataLength) || !hasMore;

    if (setData) {
      prevDataLength = dataList.length;
      return setPageLoaded(true);
    }
  }, [isLoaded]);

  /**
   * Triggered when the PageType changes
   * initializes every value so that data from previous menus doesn't affect the data on current page
   */
  useEffect(() => {
    setPageLoaded(false);
    prevDataLength = 0;
    setPageNumber(1);
  }, [pageType]);

  /**
   * The functions triggers more data to load by changing the pageNumber's state and hence triggering the above useEffects
   */
  const fetchMoreData = () => {
    console.log("fetchMore Called, pageNo : ", pageNumber);
    setPageNumber((p) => p + 1);
  };

  /**
   * the list of elements in formatted JSX form directly ready to render
   * Variable storing the data-items list after API fetching, filtering and converting to JSX components list
   * @const
   */
  const displayItemList = renderListData(dataList);

  /**
   * Triggers more loading of data for infinite scrolling
   * @param param the startIndex and endIndex of rows
   * @returns the loaded data to show in infinite scrolling
   */
  const loadMoreRows = (param: any) => {
    const startIndex = param.startIndex;
    const stopIndex = param.stopIndex;

    const dataLoaded = [];
    for (let i = startIndex; i < stopIndex; i++) {
      dataLoaded[i] = displayItemList[i];
    }
    fetchMoreData(); // call fetchMoreData to increase pageNumber by 1
    return Promise.resolve(dataLoaded);
  };

  /**
   * AutoSizer : enables the auto sizing of the child elements based on their size
   * List : enables virtualization by populating the DOM with only the rows which are seen on screen
   * CellMeasurer : tells the size of the element
   */
  return pageLoaded ? (
    <InfiniteLoader
      isRowLoaded={({ index }) => !hasMore || index < displayItemList.length}
      loadMoreRows={loadMoreRows}
      rowCount={displayItemList.length + 1}
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
                rowCount={displayItemList.length}
                rowRenderer={({ key, index, style, parent }) => {
                  const element = displayItemList[index];
                  return (
                    <CellMeasurer
                      key={key}
                      cache={cache.current}
                      parent={parent}
                      columnIndex={0}
                      rowIndex={index}
                    >
                      <div style={style}>{element}</div>
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
    <div className={styles.spinner}>
      <Spinner />
    </div>
  );
};
