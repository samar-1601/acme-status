import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Spinner } from "baseui/spinner";

const classValue = (status: string) => {
  let style: string = styles.itemStatus;
  if (status === "investigating") {
    style = `${style} ${styles.bgBlue}`;
  }
  if (status === "resolved") {
    style = `${style} ${styles.bgGreen}`;
  }
  return style;
};

interface Props {
  idList: string[];
}

export const OpenListView: React.FC<Props> = ({ idList }) => {
  const [dataList, setData] = useState<any[]>([]);

  const [hasLoaded, setHasLoaded] = useState(false);

  const getData = (pageId: string) => {
    const URL = `https://api.statuspage.io/v1/pages/${pageId}/incidents`;
    fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    })
      .then((response) => response.json())
      .then((dataItem) => {
        setData(dataItem);
        setHasLoaded(true);
      });
  };

  useEffect(() => {
    idList.forEach(getData);
  }, [idList]);


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
    data["components"].forEach((component: any, id:any) => {
      componentsList.push(
        <span key = {id} className={styles.componentItem}>
          <span>{component["name"]}</span>
        </span>
      );
    });
    return componentsList;
  };

  let listItems: JSX.Element[] = dataList.map((data, id) => {
    return (
      <div key={id} className={styles.listItem}>
        <div className={styles.listDetails}>
          <span className={styles.itemName}>{data["name"]}</span>
          <span className={classValue(data["status"])}>{data["status"]}</span>
          <span className={styles.itemDate}>
            {formatDate(data["created_at"])}
          </span>
          <span className={styles.component}>{getComponents(data)}</span>
        </div>
      </div>
    );
  });

  return <>{hasLoaded?listItems:<div className={styles.spinner}><Spinner/></div>}</>;
};
