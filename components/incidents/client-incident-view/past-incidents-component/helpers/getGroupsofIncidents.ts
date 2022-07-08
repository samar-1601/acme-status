import { formattedDateInSlashFormat } from "./formatDateInSlashFormat";

const comparator = (a: any, b: any) => {
  let aa: any[] = a.toString().split("/");
  let bb: any[] = b.toString().split("/");
  return aa[2] - bb[2] || aa[1] - bb[1] || aa[0] - bb[0];
};

export const getGroupedIncidentsUpdatedOnSameDate = (incidentList: any) => {
  let map = new Map(); // map to store all incident updates for the same day together (date is used as key)

  // iterate through the incidents and add keys for the map and subsequently add the incidents completed on the same day together
  for (let i = 0; i < incidentList.length; i++) {
    const incident: any = incidentList[i];
    const date: string | Date = formattedDateInSlashFormat(
      new Date(incident["updated_at"])
    );
    let previous = [];
    if (map.has(date)) previous = map.get(date);

    map.set(date, previous.concat(incident)); // concat the new incidents to the previous ones on the same day
  }
  // sort the groups in decreasing order of dates
  map = new Map([...map].sort(comparator).reverse());
  return map;
};
