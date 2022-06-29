// constants
import { StatusType } from "../../../../constants";

/**
 * Status' style
 * @param { string } status Status's name obtained in API response
 * @returns { string } The style for the status in list-view
 * @global
 */
export const statusLabelColorDecider = (status: string) => {
  status = status.toLowerCase();
  switch (status) {
    case StatusType.Investigating:
      return {
        //bgBlue
        backgroundColor: "rgb(191, 214, 231)",
        color: "rgb(32, 32, 212)",
      };
    case StatusType.Resolved:
      //bgGreen
      return {
        backgroundColor: "rgb(195, 225, 199)",
        color: "gb(59, 136, 49)",
      };
    case StatusType.Verifying:
      // bgYellow
      return {
        backgroundColor: "rgb(233, 236, 139)",
        color: "rgb(184, 157, 20)",
      };
    case StatusType.Completed:
      // bgPink
      return {
        backgroundColor: "rgb(236, 209, 230)",
        color: "rgb(174, 68, 160)",
      };
    case StatusType.Scheduled:
      // bgOrange
      return {
        backgroundColor: "rgb(233, 224, 191)",
        color: "rgb(194, 139, 50)",
      };
    case StatusType.InProgress:
      // bgGreyBlue
      return {
        backgroundColor: "rgb(184, 223, 222)",
        color: "rgb(54, 115, 165)",
      };
    default:
      return {
        backgroundColor: "grey",
        color: "black",
      };
  }
};
