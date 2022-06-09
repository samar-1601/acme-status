import { NEXT_PUBLIC_AUTH_TOKEN } from "../../constants";
import styles from "./styles.module.css";

export const generateList = function (dataList: any) {
  console.log("here",dataList)

  let listItems = [];

  for (let i=0; i<dataList.length; i++) {
    console.log(i, dataList[i])
    listItems[i] = (
      <div key={dataList[i]["id"]} className={styles.listItem}>
        <span className={styles.itemName}>{dataList[i]["name"]}</span><br/>
        <span className={styles.itemDescription}>{dataList[i]["description"]}</span>
      </div>)
  }

  return <div className={styles.itemList}>{listItems}</div>;
};
