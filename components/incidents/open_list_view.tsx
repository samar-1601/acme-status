import styles from "./styles/styles.module.css";
import useLoadPageData from "./loadPageData";
import { useEffect, useState, useRef } from "react";
import { StyledSpinnerNext } from "baseui/spinner";
import InfiniteScroll from "react-infinite-scroll-component";


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
  pageType: string;
}

let prevDataListLength = 0;


export const OpenListView: React.FC<Props> = ({ pageType }) => {
  console.log("PAGE TYPE IS ::::");
  console.log(pageType);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  let listItems: JSX.Element[] = [];

  let { dataList, isLoaded } = useLoadPageData(pageNumber, pageType);

  useEffect(() => {
    prevDataListLength = 0;
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setHasLoaded(true);
      if (dataList.length == 0 || dataList.length == prevDataListLength) {
        setHasMore(false);
      }
      prevDataListLength = dataList.length;
    }
  }, [isLoaded]);

  const fetchMoreData = () => {
    console.log("called");
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

  if (dataList.length !== 0) {
    let data: any[] = Array();
    switch (pageType) {
      case "All":
        data = dataList;
        break;
      case "Active":
        data = dataList.filter(
          (data) =>
            data["status"] !== "resolved" && data["status"] !== "completed"
        );
        break;
      case "Maintainances":
        data = dataList.filter((data) => data["impact"] === "critical");
        break;
    }

    console.log("data");
    console.log(data);
    if (data.length !== 0) {
      listItems = data.map((data, id) => {
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
    } 
    else{
      console.log("here");
      // setHasMore(false);
      // fetchMoreData();
    }
  }

  console.log(pageNumber);
  console.log(dataList);

  return hasLoaded ? (
    <InfiniteScroll
      dataLength={dataList.length}
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
      {<div>{listItems.length > 0 ? listItems : "No items found!!"}</div>}
    </InfiniteScroll>
  ) : (
    <div className={styles.spinner}>
      <StyledSpinnerNext />
    </div>
  );

  // return hasLoaded ? (
  //   <div className={styles.itemList}>{listItems.length>0?listItems:"No items found!!"}</div>
  // ) : (
  //   <div className={styles.spinner}>
  //     <StyledSpinnerNext />
  //   </div>
  // );
};
