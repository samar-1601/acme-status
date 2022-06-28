/**
 * Format date for display
 * @param date The date which needs to be formatted to display
 * @returns {string} timeStatus : the formatted data in X days ago format
 */
export const formatDate = (date: string | Date): string => {
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
