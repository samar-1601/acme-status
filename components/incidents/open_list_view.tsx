import styles from "./styles.module.css";

const classValue = (status: string) => {
  let style: string = styles.itemStatus;
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
  return style;
};

interface Props {
  dataList: any[];
}

export const OpenListView: React.FC<Props> = ({ dataList }) => {

  console.log(dataList);
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
    if(data["components"])
    {
      data["components"].forEach((component: any, id:any) => {
        componentsList.push(
          <span key = {id} className={styles.componentItem}>
            <span>{component["name"]}</span>
          </span>
        );
      });
    }
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

  return <div className={styles.itemList}>{listItems}</div>;
};
