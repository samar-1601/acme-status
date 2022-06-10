// components
import { Block } from "baseui/block";

// constants
import { PageType } from "../../../constants";

// styles
import {
  listItem,
  itemStatus,
  itemDate,
  itemName,
} from "./styles/FullIncidentsList";
import {
  maintenanceListItem,
  maintenanceItemStatus,
  maintenanceItemDate,
  maintenanceItemName,
} from "./styles/maintenanceList";

/**
 * Format date for display
 * @param date The date which needs to be formatted to display
 * @returns formatted data in x days ago format
 */
const formatDate = (date: string | Date, pageType: string): string => {
  const formatter = new Intl.DateTimeFormat("en", { month: "short" });
  date = new Date(date);

  if (pageType == PageType.Scheduled)
    return `Posted on ${date.getUTCDay()} ${formatter.format(
      date
    )}, ${date.getUTCHours()}:${date.getUTCMinutes()} UTC`;

  return `${date.getUTCDay()} ${formatter.format(
    date
  )}, ${date.getUTCHours()}:${date.getUTCMinutes()} UTC`;
};

/**
 * list of data-items to display on screen
 * @param data filtered JSON data from API
 * @returns JSX component list
 */
export const renderData: React.FC = (
  data: any,
  pageType: string
): JSX.Element => {
  if (pageType == PageType.Scheduled) {
    return (
      <Block key={data["name"]} {...maintenanceListItem}>
        <Block {...maintenanceItemName}>{data["name"]}</Block>
        <Block {...maintenanceItemStatus}>{data["status"]}</Block>
        <Block {...maintenanceItemDate}>{formatDate(data["created_at"], pageType)}</Block>
      </Block>
    );
  }
  return (
    <Block key={data["name"]} {...listItem}>
      <Block {...itemName}>{data["name"]}</Block>
      <Block {...itemStatus}>{data["status"]}</Block>
      <Block {...itemDate}>{formatDate(data["created_at"], pageType)}</Block>
    </Block>
  );
};
