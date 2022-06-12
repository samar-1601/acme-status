// components
import { Block } from "baseui/block";
import { Avatar } from "baseui/avatar";
import { Button } from "baseui/button";
import Link from "next/link";

// constants
import { ComponentStatusIconUrls } from "../../../constants";

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
  updateIncidentButton,
} from "./styles/listStyles";

/**
 * Format date for display
 * @param date The date which needs to be formatted to display
 * @returns formatted data in x days ago format
 */
const formatDate = (date: string | Date): string => {
  date = new Date(date);
  const timeElapsed = Date.now() - date.getTime();

  // calculating X days ago
  let seconds = timeElapsed / 1000;
  let minutes = seconds / 60;
  let hours = minutes / 60;
  let days = Math.floor(hours / 24);

  // making h:m to hh:mm
  let timeHour: string = `${date.getUTCHours()}`;
  if (timeHour.length == 1) timeHour = `0${timeHour}`;
  let timeMins: string = `${date.getUTCMinutes()}`;
  if (timeMins.length == 1) timeMins = `0${timeMins}`;

  let timeStatus = `${days} DAYS AGO (${timeHour}:${timeMins} UTC)`;

  return timeStatus;
};

/**
 * getComponents
 * @param data the data from which the components list is made
 * @returns JSX containing the components in the current incident
 */
const getComponents = (data: any): JSX.Element[] => {
  let componentsList: JSX.Element[] = [];
  if (data["components"]) {
    data["components"].forEach((component: any, id: any) => {
      componentsList.push(
        <Block key={component["name"]} {...componentItem}>
          <Avatar
            name={component["name"]}
            src={ComponentStatusIconUrls(component["status"])}
            size="scale600"
            overrides={{
              Root: {
                style: {
                  paddingRight: "8px",
                },
              },
            }}
          ></Avatar>
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
export const renderData: React.FC = (data: any): JSX.Element => {
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
      <Link
        href={{
          pathname: `/incident/update/${data["id"]}`,
          query: data["id"],
        }}
      >
        <Block {...updateIncidentButton}>Update</Block>
      </Link>
    </Block>
  );
};