import styles from "./styles/styles.module.css";

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
        <span key={component["name"]} className={styles.componentItem}>
          {component["name"]}
        </span>
      );
    });
  }
  return componentsList;
};

/**
 * list of data-items to display on screen
 * @param data filtered JSON data from API
 * @returns JSX component list
 */
export const renderData = (data:any) => {
    return (
      <div key={data["name"]} className={styles.listItem}>
        <div className={styles.listDetails}>
          <span className={styles.itemName}>{data["name"]}</span>
          <div className={styles.itemDetail1}>
            <span className={classValue(data["status"])}>{data["status"]}</span>
            <span className={styles.itemDate}>
              {formatDate(data["created_at"])}
            </span>
          </div>
          <span className={styles.component}>{getComponents(data)}</span>
        </div>
      </div>
    );
};
