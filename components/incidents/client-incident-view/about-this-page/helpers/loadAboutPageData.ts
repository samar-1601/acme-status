// constants
import { PAGE_ID } from "../../../../../constants";

/**
 * get a list components
 * @returns Components list fetched from API
 */
export const getComponents = async () => {
  try {
    let URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components`;

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });

    const dataItem: any = await response.json();
    const status: number = response.status;

    return [dataItem, status, false];
  } catch (err) {
    console.log(err);
    return [[], 500, true];
  }
};

/**
 * Get a components' uptime value
 * @param componentID ID of the component for which we need uptime
 * @returns Uptime percentage for the component
 */
export const getComponentUptime = async (componentID: string) => {
  try {
    let URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components/${componentID}/uptime`;

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const dataItem: any = await response.json();
    return [dataItem["uptime_percentage"], false];
  } catch (err) {
    console.log(err);
    return [[], true];
  }
};
