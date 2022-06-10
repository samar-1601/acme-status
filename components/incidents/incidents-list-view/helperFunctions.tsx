// components
import { Block } from "baseui/block";

// styles
import {
  listDetails,
  listItem,
  itemStatus,
  component,
  itemDate,
  itemDetailsSecondLine,
  itemName,
  componentItem,
} from "./styles/listStyles";

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
        <Block key={component["name"]} {...componentItem}>
          {component["name"]}
        </Block>
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
export const renderData = (data: any) => {
  return (
    <Block key={data["name"]} {...listItem}>
      <Block {...listDetails}>
        <Block {...itemName}>{data["name"]}</Block>
        <Block {...itemDetailsSecondLine}>
          <Block {...itemStatus}>{data["status"]}</Block>
          <Block {...itemDate}>{formatDate(data["created_at"])}</Block>
        </Block>
        <Block {...component}>{getComponents(data)}</Block>
      </Block>
    </Block>
  );
};
