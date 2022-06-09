import { NEXT_PUBLIC_AUTH_TOKEN } from "../../constants";
import styles from "./styles.module.css";

const Item = function (props: any) {
  const URL = `https://api.statuspage.io/v1/pages/${props.comp.page_id}/components/${props.comp.id}/uptime`;
  fetch(URL, {
    headers : { 
      "Content-Type": "application/json",
      Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`
    }
  })
  .then(response => response.json())
  .then(response => {
    props.comp.description = "uptime data unavailable!";
    if(!response.error) {
      const date1 = new Date(response.range_end);
      const date2 = new Date(response.range_start);
      let days = Math.ceil(Math.abs(date1.valueOf()-date2.valueOf())/(1000*60*60*24));
      props.comp.description = String(response.uptime_percentage)+"% uptime in the past "+String(days)+" days";
    }
  });
  console.log(props.comp)
  return (
    <div key={props.comp.id} className={styles.listItem}>
      <span className={styles.itemName}>{props.comp.name}</span><br/>
      <span className={styles.itemDescription}>{props.comp.description}</span>
    </div>)
} 

export const GenerateList = function (props: any) {
  const dataList = props.dataList;
  console.log("here",dataList)

  let listItems = [];

  for (let i=0; i<dataList.length; i++) {
    console.log(i, dataList[i])
    listItems[i] = <Item comp={dataList[i]} />
  }

  return <div className={styles.itemList}>{listItems}</div>;
};
