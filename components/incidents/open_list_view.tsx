import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export const OpenListView = () => {
  const [dataList, setData] = useState([]);
  const URL = "https://api.statuspage.io/v1/pages/7dwwybj29fy8/incidents";
  const getData = () => {
    fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    })
      .then((response) => response.json())
      .then((myJson) => setData(myJson));
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(dataList);

  const classValue = (status: string) => {
    let style: string = styles.itemStatus;
    if (status === "investigating") {
      style = `${style} ${styles.bgBlue}`;
    }
    return style;
  };

  const formatDate = (date: string | Date) => {
    date = new Date(date);
    console.log(date);
    const timeElapsed = Date.now() - date.getTime();

    let seconds = timeElapsed / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = Math.floor(hours / 24);

    let timeStatus = `${days} DAYS AGO (${date.getUTCHours()}:${date.getUTCMinutes()} UTC)`;

    return timeStatus;
  };

  return (
    <>
      {dataList.map((data, id) => {
        return (
          <div key={id} className={styles.listItem}>
            <div className={styles.listDetails}>
              <span className={styles.itemName}>{data["name"]}</span>
              <span className={classValue(data["status"])}>
                {data["status"]}
              </span>
              <span className={styles.itemDate}>
                {formatDate(data["created_at"])}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};
