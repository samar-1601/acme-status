// components
import { Block } from "baseui/block";
import { Avatar } from "baseui/avatar";
import Link from "next/link";

// constants
import { ComponentStatusIconUrls } from "../../../../constants";

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
  editIncidentButton,
} from "../styles/listStyles";

/**
 * Format date for display
 * @param date The date which needs to be formatted to display
 * @returns {string} timeStatus : the formatted data in X days ago format
 */
const formatDate = (date: string | Date): string => {
  date = new Date(date);
  const timeElapsed = Date.now() - date.getTime(); // total time elapsed

  // calculating X days ago
  let seconds = timeElapsed / 1000; // time elapsed in seconds
  let minutes = seconds / 60; // time elapsed in minutes
  let hours = minutes / 60; // time elapsed in hours
  let days = Math.floor(hours / 24); // time elapsed in days

  // making h:m to hh:mm like 8:2 ro 08:02
  let timeHour: string = `${date.getUTCHours()}`;
  if (timeHour.length == 1) timeHour = `0${timeHour}`; // prepend 0 if single digit hour
  let timeMins: string = `${date.getUTCMinutes()}`;
  if (timeMins.length == 1) timeMins = `0${timeMins}`; // prepend 0 if single digit minute

  let timeStatus = `${days} DAYS AGO (${timeHour}:${timeMins} UTC)`;

  return timeStatus;
};

/**
 * getComponents
 * @param incident the incident for which the components list is made
 * @returns JSX containing the components in the current incident
 */
const getComponents = (incident: any): JSX.Element => {
  let componentsList: JSX.Element[] = []; // List to store the formatted components list

  // if there are components for the incident
  if (incident["components"]) {
    // iterate through the component list
    incident["components"].forEach((component: any) => {
      const renderComponent: JSX.Element = // variable storing the formatted component ready to render
        (
          <Block key={component["name"]} {...componentItem}>
            <Avatar // BaseUI component for rendering Icons
              name={component["name"]}
              src={ComponentStatusIconUrls(component["status"])} // get the src address for the component based on its status
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
      componentsList.push(renderComponent); // push the formatted component to the list
    });
  }
  if (componentsList.length > 0) {
    return <Block {...component}>{componentsList}</Block>;
  }
  // handling the case when no component has been affected by the incident
  return (
    <Block
      overrides={{
        Block: {
          style: {
            color: "#808080",
            marginTop: "18px",
            paddingBottom: "8px",
          },
        },
      }}
    >
      No components affected
    </Block>
  );
};

/**
 * incident formatted for rendering in the incident list
 * @param incident data recieved from the API
 * @returns JSX component list
 */
export const renderData: React.FC = (incident: any): JSX.Element => {
  /* get the components corressponding to the incident and append them for render */
  const renderComponents = getComponents(incident);

  return (
    <Block key={incident["name"]} {...listItem}>
      <Block {...listDetails}>
        <Block {...itemName}>{incident["name"]}</Block>
        <Block {...itemDetailsSecondLine}>
          <Block {...itemStatus}>{incident["status"]}</Block>
          <Block {...itemDate}>{formatDate(incident["created_at"])}</Block>
        </Block>
        {renderComponents}
      </Block>
      <Link
        href={{
          pathname: `/incident/update/${incident["id"]}`, // send the incident ID to the update page address
        }}
      >
        <Block {...editIncidentButton}>Edit</Block>
      </Link>
    </Block>
  );
};
