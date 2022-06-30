// constants
import { NEXT_PUBLIC_AUTH_TOKEN, PAGE_ID } from "../../../../../constants";

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
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const componentList = await response.json();

    return componentList;
  } catch (err) {
    console.log(err);
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
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const uptimeResponse = await response.json();

    return uptimeResponse["uptime_percentage"];
  } catch (err) {
    console.log(err);
  }
};
