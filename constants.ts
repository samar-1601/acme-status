import { STATUSType } from "./types";
export const PAGE_NAME = "Acme";

export enum Page {
  Active = "Active",
  ThirdParty = "Third-Party",
}

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

/**
 * SideBarMenuItems
 * menu items for sidebar
 * @type {enum}
 */
export enum SideBarMenu {
  Home = "Home",
  IncidentsView = "Incidents",
  CreateIncidents = "Create Incidents",
  Components = "Components",
  ClientsPage = "Clients Page",
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
export const getStatus = (id: number): string => {
  switch (id) {
    case 1:
      return "operational";
    case 2:
      return "degraded_performance";
    case 3:
      return "partial_outage";
    case 4:
      return "major_outage";
    case 5:
      return "under_maintenance";
    default:
      return "";
  }
};

/**
 * @param status component status text
 * @returns Displayable/formatted text to show for component's status
 */
export const getDisplayComponentStatusText = (status: string): string => {
  switch (status) {
    case "operational":
      return "Operational";
    case "degraded_performance":
      return "Degraded Performance";
    case "partial_outage":
      return "Partial Outage";
    case "major_outage":
      return "Major Outage";
    case "under_maintenance":
      return "Under Maintenance";
    default:
      return "";
  }
};

export const getIncidentStatus = (id: String): string => {
  switch (id) {
    case "Investigating":
      return "scheduled";
    case "Identified":
      return "in_progress";
    case "Monitoring":
      return "verifying";
    case "Resolved":
      return "completed";
    default:
      return "";
  }
};

export const getIncidentStatusFromPost = (id: string) => {
  switch (id) {
    case "scheduled":
      return "Investigating";
    case "in_progress":
      return "Identified";
    case "verifying":
      return "Monitoring";
    case "completed":
      return "Resolved";
  }
}

/**
 * ComponentStatusType
 * status values for incidents
 * @type {enum}
 */
export enum ComponentStatusType {
  Operational = "operational",
  UnderMaintenance = "under_maintenance",
  DegradedPerformance = "degraded_performance",
  MajorOutage = "major_outage",
  PartialOutage = "partial_outage",
}

/**
 * function to format status text
 * @param status status of a component
 * @returns User friendly formatted status text
 */
export const getComponentStatusText = (status: string) => {
  switch (status) {
    case ComponentStatusType.Operational:
      return "Operational";
    case ComponentStatusType.DegradedPerformance:
      return "Degraded Performance";
    case ComponentStatusType.MajorOutage:
      return "Major Outage";
    case ComponentStatusType.PartialOutage:
      return "Partial Outage";
    case ComponentStatusType.UnderMaintenance:
      return "Under Maintenance";
    case StatusType.Completed:
      return "Completed";
    case StatusType.InProgress:
      return "In Progress";
    case StatusType.Investigating:
      return "Investigating";
    case StatusType.Resolved:
      return "Resolved";
    case StatusType.Scheduled:
      return "Scheduled";
    case StatusType.Verifying:
      return "Verifying";
    default:
      return "";
  }
};

export const ICON_URL = {
  partial_outage: "/paritial_outage.png",
  major_outage: "/major_outage.png",
  degraded_performance: "/degraded_performance.png",
  under_maintenance: "/under_maintenance.png",
  operational: "/operational2.webp",
};
