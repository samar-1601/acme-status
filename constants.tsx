import { STATUSType } from "./variableTypes";

export const NEXT_PUBLIC_AUTH_TOKEN = "c12226f5-9156-47cd-bf7c-a36379785a25";

/**
 * PageType
 * defines the page to show on screen based on navbar menu selected
 * @type {enum}
 */
export enum PageType {
  All = "All",
  Active = "Active",
  Maintenance = "Maintenance",
  Scheduled = "Scheduled",
}

/**
 * StatusType
 * status values for incidents
 * @type {enum}
 */
export enum StatusType {
  Investigating = "investigating",
  Resolved = "resolved",
  Verifying = "verifying",
  Completed = "completed",
  Scheduled = "scheduled",
  InProgress = "in_progress",
}
export const STATUS: STATUSType = {
  operational: 1,
  degraded_performance: 2,
  partial_outage: 3,
  major_outage: 4,
  under_maintenance: 5,
};

export const STATUSNames = [
  "Investigating",
  "Identified",
  "Monitoring",
  "Resolved",
];

export const ITEMS = [
  { title: "Operational", imgUrl: "/operational2.webp", id: "0" },
  {
    title: "Degraded Performance",
    imgUrl: "/degraded_performance.png",
    id: "1",
  },
  { title: "Partial Outage", imgUrl: "/paritial_outage.png", id: "2" },
  { title: "Major Outage", imgUrl: "/major_outage.png", id: "3" },
  { title: "Under Maintainence", imgUrl: "/under_maintenance.png", id: "4" },
];

/**
 * Returns the image URL corresponding to the component status
 */
export const ComponentStatusIconUrls = (status: string) => {
  status = status.toLowerCase();
  switch (status) {
    case "partial_outage":
      return "/paritial_outage.png";
    case "major_outage":
      return "/major_outage.png";
    case "degraded_performance":
      return "/degraded_performance.png";
    case "under_maintenance":
      return "/under_maintenance.png";
    case "operational":
      return "/operational2.webp";
    default:
      return "";
  }
};
