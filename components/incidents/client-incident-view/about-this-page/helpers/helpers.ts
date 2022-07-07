//helper functions
import { formatDate } from "../../list-view-incidents/helpers/formatDate";

// constants
import { ComponentStatusType, getComponentStatusText, PageType } from "../../../../../constants"; // static path

/**
 * function for determining the color for a component-status-type
 * @param componentStatusType Component Status type
 * @returns corresonding color for the value
 */
export const legendColorDeterminer = (
  componentStatusType: ComponentStatusType
) => {
  if (componentStatusType == ComponentStatusType.MajorOutage) return "#e74c3c"; // red
  if (componentStatusType == ComponentStatusType.Operational) return "#2fcc66"; //green
  if (componentStatusType == ComponentStatusType.PartialOutage)
    return "#f1c40f"; // yellow

  return "rgb(179, 186, 197)"; // grey
};

/**
 * get random values for bars
 * @param days size of list to generate
 * @returns a list of random values for colored status bars
 */
export const generateRandomBarsData = (days: number) => {
  let list: any[] = [];
  for (let day = 0; day < days; day++) {
    const downTime = Math.floor(Math.random() * 70);
    list.push(downTime);
  }
  return list;
};

// TODO: NEED TO HAVE AN API TO BUILD THE COLOR BAR VALUES
export const barColorDeterminer = (value: number) => {
  if (value < 20) return "rgb(179, 186, 197)"; // grey
  if (value < 60) return "#2fcc66"; //green
  if (value < 65) return "#f1c40f"; // yellow

  return "#e74c3c"; // red
};

/**
 * get the date to show when we hover over a bar
 * @param day the day number
 * @returns formatted date for a given bar's date
 */
export const getDateforBar = (totalDays: number, day: number) => {
  const daysAgo = totalDays - day - 1;
  let date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return formatDate(date, PageType.Completed); // get formatted date in "08 June 2022" format
};

/**
 * Status' style
 * @param { string } status Status's name obtained in API response
 * @returns { string } The style for the status in list-view
 * @global
 */
 export const componentsStatusColor = (status: string) => {
  switch (status) {
    case getComponentStatusText(ComponentStatusType.Operational):
      return {
        //green
        color: "#2fcc66",
      };
    case getComponentStatusText(ComponentStatusType.DegradedPerformance):
      //yellow
      return {
        color: "#f1c40f",
      };
    case getComponentStatusText(ComponentStatusType.MajorOutage):
      // red
      return {
        color: "#e74c3c",
      };
    case getComponentStatusText(ComponentStatusType.PartialOutage):
      // orange
      return {
        color: "#e67e22",
      };
    case getComponentStatusText(ComponentStatusType.UnderMaintenance):
      // pink
      return {
        color: "#3498DB",
      };
    default:
      return {
        color: "black",
      };
  }
};