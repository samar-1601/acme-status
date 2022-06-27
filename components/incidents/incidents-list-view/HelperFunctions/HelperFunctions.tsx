// components
import { Block } from "baseui/block";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// constants
import {
  ComponentStatusIconUrls,
  getDisplayComponentStatusText,
} from "../../../../constants";

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
  componentItemIconWrapper,
  componentIconHoverTextStyle,
  buttonArea,
} from "../styles/listStyles";
import Image from "next/image";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";
import { DeleteIncident } from "../../deleteIncident/DeleteIncident";
import { useSnackbar } from "baseui/snackbar";

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
            <StatefulPopover
              content={
                <Block {...componentIconHoverTextStyle}>
                  {getDisplayComponentStatusText(component["status"])}
                </Block>
              }
              triggerType={TRIGGER_TYPE.hover}
            >
              <Block {...componentItemIconWrapper}>
                <Image // NextJS component for rendering Image
                  src={ComponentStatusIconUrls(component["status"])} // get the src address for the component based on its status
                  height="16px"
                  width="16px"
                ></Image>
              </Block>
            </StatefulPopover>
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
export const renderData: React.FC = (
  incident: any,
  enqueue: Function
): JSX.Element => {
  /* get the components corressponding to the incident and append them for render */
  const renderComponents = getComponents(incident);

  return (
    <Block key={incident["name"]} {...listItem} className="list-item">
      <Block {...listDetails}>
        <Block {...itemName}>
          {incident["name"]}{" "}
          <Block {...buttonArea} className="button-area">
            <Link
              href={{
                pathname: `/incidents/edit/${incident["id"]}`, // send the incident ID to the update page address
              }}
            >
              <Block className="edit-icon-wrapper">
              <Block padding="8px">
                <svg
                  data-spaceweb="icon"
                  viewBox="0 0 12 8.5"
                  data-icon-name="LineEdit"
                  className="sw--cv sw--dn sw--m2 sw--m3 edit-icon"
                  height={24}
                  width={24}
                >
                  <path d="M3.4 8.5H.5a.5.5 0 110-1h2.9a.5.5 0 01.5.5.5.5 0 01-.5.5zm8.1-8C11-.2 10-.2 9.3.4l-4 4a1.5 1.5 0 00-.4.8l-.3 1.5a.5.5 0 00.5.6L6.8 7c.3 0 .5-.2.7-.4l4-4a1.5 1.5 0 00.5-1.2 1.6 1.6 0 00-.5-1zm-.7 1.4l-4 4a.6.6 0 01-.3.2l-.8.2.2-.9a.5.5 0 01.1-.3l4-4a.6.6 0 01.8 0 .6.6 0 010 .8z" />
                </svg>
              </Block>
              </Block>
            </Link>
            <Block
              // {...editIncidentButton}
              onClick={() => {
                DeleteIncident(incident["id"], enqueue);
              }}
              className="edit-icon-wrapper"
            >
              <Block padding="8px">
                <svg
                  data-spaceweb="icon"
                  viewBox="0 0 14 14"
                  data-icon-name="SolidDelete"
                  className="sw--cv sw--dn sw--m2 sw--m3 edit-icon"
                  height={22}
                  width={22}
                >
                  <path d="M13.418 1.386h-5.8V.6a.582.582 0 00-1.166 0v.787H.582a.582.582 0 100 1.165h.34l1.096 8.442a.583.583 0 00.071.208c.417 1.845 1.39 2.754 2.983 2.754h4.071c1.37 0 2.43-1.163 2.755-2.973a.566.566 0 00.027-.082l1.121-8.35h.372a.582.582 0 100-1.164zm-8.624 9.711a.472.472 0 01-.052.002.58.58 0 01-.579-.53l-.51-5.837a.584.584 0 011.16-.102l.51 5.836a.583.583 0 01-.529.631zm2.81-.58a.582.582 0 11-1.164 0V4.66a.582.582 0 111.164 0zm2.267.05v.003a.58.58 0 01-.63.526h-.003a.58.58 0 01-.526-.63l.51-5.836a.582.582 0 111.16.102z" />
                </svg>
              </Block>
            </Block>
          </Block>
        </Block>
        <Block {...itemDetailsSecondLine}>
          <Block {...itemStatus}>{incident["status"]}</Block>
          <Block {...itemDate}>{formatDate(incident["created_at"])}</Block>
        </Block>
        {renderComponents}
      </Block>
    </Block>
  );
};
