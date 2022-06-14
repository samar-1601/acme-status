
export const NEXT_PUBLIC_AUTH_TOKEN = "c12226f5-9156-47cd-bf7c-a36379785a25";
export const PAGE_ID = "7dwwybj29fy8";

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
  Completed = "Completed",
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

export const ComponentStatusIconUrls = (status : string) => {
  status = status.toLowerCase();
  switch (status){
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

/**
 * ComponentStatusType
 * status values for incidents
 * @type {enum}
 */
 export enum ComponentStatusType {
  Operational =  "operational",
  UnderMaintenance = "under_maintenance",
  DegradedPerformance = "degraded_performance",
  MajorOutage = "major_outage",
  PartialOutage= "partial_outage",
}
