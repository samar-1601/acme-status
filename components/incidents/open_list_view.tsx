import styles from "./styles/styles.module.css";
import useLoadPageData from "./loadPageData";
import { useEffect, useState, useRef } from "react";
import { StyledSpinnerNext } from "baseui/spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { PageType } from "./incident_list_view";

// enum comp{
//   test = 'test'

// }

// const icons = {
//   [comp.test]: '/logo1.png',
// }

// icons[comp.test]

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

let prevDataLenth = 0;

export const OpenListView: React.FC<Props> = ({ pageType }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);

  const { dataList, isLoaded, hasMore } = useLoadPageData(pageNumber, pageType);

  useEffect(() => {
    const data = filterData(dataList, pageType);
    console.log("filter data", data.length, "prev data:", prevDataLenth);

    const fetchMore =
      isLoaded &&
      hasMore &&
      (data.length === prevDataLenth || data.length < 10);

    if (fetchMore) {
      return fetchMoreData();
    }

    const setData =
      (data.length > 0 && data.length !== prevDataLenth) || !hasMore;
    if (setData) {
      prevDataLenth = data.length;
      return setPageLoaded(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    setPageLoaded(false);
    prevDataLenth = 0;
    setPageNumber(1);
  }, [pageType]);

  const fetchMoreData = () => {
    setPageNumber((p) => p + 1);
  };

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
        return data.filter((data) => data["impact"] === "critical");
      default:
        throw new Error("Invalid page type");
    }
  };

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

  const displayItemList = renderListData(dataList);

  return pageLoaded ? (
    <InfiniteScroll
      dataLength={displayItemList.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <div className={styles.spinner}>
          <StyledSpinnerNext />
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
      <StyledSpinnerNext />
    </div>
  );
};
