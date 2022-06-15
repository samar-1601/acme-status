// constants
import { NEXT_PUBLIC_AUTH_TOKEN, PAGE_ID } from "../../../../constants";

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
