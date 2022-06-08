import styles from "./styles.module.css";

export const generateList = function (dataList: any) {
  let listItems: JSX.Element[] = dataList.map((data) => {
    return (
      <div key={data["id"]} className={styles.listItem}>
        <span className={styles.itemName}>{data["name"]}</span><br/>
        <span className={styles.itemDescription}>{data["status"]}</span>
      </div>
    );
  });

  return <div className={styles.itemList}>{listItems}</div>;
};
