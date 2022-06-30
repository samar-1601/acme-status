// constants
import { PageType } from "../../../../../constants";



/**
 * Format date for display
 * @param date The date which needs to be formatted to display
 * @param pageType The type in which we need the formatted date
 * @returns formatted data in the required format
 */
export const formatDate = (
  date: string | Date,
  pageType: string = PageType.All
): string => {
  const formatter = new Intl.DateTimeFormat("en", { month: "short" });
  date = new Date(date);

  // making h:m to hh:mm
  let timeHour: string = `${date.getUTCHours()}`;
  if (timeHour.length == 1) timeHour = `0${timeHour}`;
  let timeMins: string = `${date.getUTCMinutes()}`;
  if (timeMins.length == 1) timeMins = `0${timeMins}`;

  // returns formatted date if "Scheduled" pageType
  if (pageType == PageType.Scheduled)
    return `Posted on ${date.getUTCDate()} ${formatter.format(
      date
    )}, ${timeHour}:${timeMins} UTC`;

  // return formatted date for "Completed" pageType
  if (pageType == PageType.Completed)
    return `${date.getUTCDate()} ${formatter.format(
      date
    )}, ${date.getUTCFullYear()}`;

  return `${date.getUTCDate()} ${formatter.format(
    date
  )}, ${timeHour}:${timeMins} UTC`;
};

