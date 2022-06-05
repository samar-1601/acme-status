import styles from "./styles.module.css";

export const generateList = function (dataList: any) {
  let listItems: JSX.Element[] = dataList.map((data, id) => {
    return (
      <div key={id} className={styles.listItem}>
        <span className={styles.itemName}>{data["name"]}</span><br/>
        <span className={styles.itemDescription}>this was up</span>
      </div>
    );
  });

  return <div className={styles.itemList}>{listItems}</div>;
};
