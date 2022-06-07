import styles from "./styles/styles.module.css";
import useLoadPageData from "./loadPageData";
import { useEffect, useState, useRef } from "react";
import { PageType } from "./incident_list_view";

import { Spinner } from "baseui/spinner";
import InfiniteScroll from "react-infinite-scroll-component";

import { InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; 


/**
 * Status' classValue
 * @param { string } status Status's name obtained in API response
 * @returns { string } The style for the status in list-view
 * @global
 */
const classValue = (status: string) => {
  let style: string = styles.itemStatus;
  status = status.toLowerCase();
  if (status === "investigating") {
    style = `${style} ${styles.bgBlue}`;
  }
  if (status === "resolved") {
    style = `${style} ${styles.bgGreen}`;
  }
  if (status === "verifying") {
    style = `${style} ${styles.bgYellow}`;
  }
  if (status === "completed") {
    style = `${style} ${styles.bgPink}`;
  }
  if (status === "scheduled") {
    style = `${style} ${styles.bgOrange}`;
  }
  if (status === "in_progress") {
    style = `${style} ${styles.bgGreyBlue}`;
  }
  return style;
};

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

  /**
   * API response
   * dataList : JSON response for the 10 items the current pageNumber
   */
  const { dataList, isLoaded, hasMore } = useLoadPageData(pageNumber, pageType);

  /**
   * triggered when the data is loaded from the API
   */
  useEffect(() => {
    const data = filterData(dataList, pageType); // filter the data based on pageType
    console.log("filter data", data.length, "prev data:", prevDataLength);

    /**
     * Check if we need to fetch more data for the next page
     * Conditions:  If the current data has loaded
     *            + we need more data to call for next page
     *            + the current items in the page are not 10
     */
    const fetchMore =
      isLoaded &&
      hasMore &&
      (data.length === prevDataLength || data.length < 10);

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
      (data.length > 0 && data.length !== prevDataLength) || !hasMore;

    if (setData) {
      prevDataLength = data.length;
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
    setPageNumber((p) => p + 1);
  };

  /**
   * Format date for display
   * @param date The date which needs to be formatted to display
   * @returns formatted data in x days ago format
   */
  const formatDate = (date: string | Date) => {
    date = new Date(date);
    const timeElapsed = Date.now() - date.getTime();

    let seconds = timeElapsed / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = Math.floor(hours / 24);

    let timeStatus = `${days} DAYS AGO (${date.getUTCHours()}:${date.getUTCMinutes()} UTC)`;

    return timeStatus;
  };

  console.log(dataList)
  /**
   * getComponents
   * @param data the data from which the components list is made
   * @returns JSX containing the components in the current incident
   */
  const getComponents = (data: any) => {
    let componentsList: JSX.Element[] = [];
    if (data["components"]) {
      data["components"].forEach((component: any, id: any) => {
        componentsList.push(
          <span key={id} className={styles.componentItem}>
            {component["name"]}
          </span>
        );
      });
    }
    return componentsList;
  };

  /**
   * filter data from API
   * @param data data recieved from API
   * @param filter pageType for the menu
   * @returns filtered data in JSON array
   */
  const filterData = (data: any[], filter: PageType) => {
    switch (filter) {
      case PageType.All:
        return data;
      case PageType.Active:
        return data.filter(
          (data) =>
            data["status"] !== "resolved" && data["status"] !== "completed"
        );
      case PageType.Maintenance:
        return data;
      default:
        throw new Error("Invalid page type");
    }
  };

  /**
   * list of data-items to display on screen
   * @param data filtered JSON data from API
   * @returns JSX component list
   */
  const renderListData = (data: any[]) => {
    return filterData(data, pageType).map((data, id) => {
      return (
        <div key={id} className={styles.listItem}>
          <div className={styles.listDetails}>
            <span className={styles.itemName}>{data["name"]}</span>
            <div className={styles.itemDetail1}>
              <span className={classValue(data["status"])}>
                {data["status"]}
              </span>
              <span className={styles.itemDate}>
                {formatDate(data["created_at"])}
              </span>
            </div>
            <span className={styles.component}>{getComponents(data)}</span>
          </div>
        </div>
      );
    });
  };

  /**
   * Variable storing the data-items list after API fetching, filtering and converting to JSX components list
   * @const
   */
  const displayItemList = renderListData(dataList);

  return pageLoaded ? (
    <InfiniteScroll
      dataLength={displayItemList.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <div className={styles.spinner}>
          <Spinner />
        </div>
      }
      className={styles.itemList}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>You've reached the end of page</b>
        </p>
      }
    >
      <div>
        {displayItemList.length > 0 ? displayItemList : "No items found!!"}
      </div>
    </InfiniteScroll>
  ) : (
    <div className={styles.spinner}>
      <Spinner />
    </div>
  );
};
