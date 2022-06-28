import { DURATION } from "baseui/snackbar";
import { PAGE_ID } from "../../../../constants";

export const deleteIncident = async (
  incidentId: string,
  enqueue: Function,
  reFetch: any
) => {
  fetch(
    "https://api.statuspage.io/v1/pages/" +
      PAGE_ID +
      "/incidents/" +
      incidentId,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    }
  )
    .then((response) => response.json())
    .then(async (json) => {
      console.log(json);
      if ("error" in json) {
        throw json.error;
      }
      enqueue(
        {
          message: "Successfully Deleted Incident",
        },
        DURATION.long
      );
      await reFetch();
    })
    .catch((err) => {
      console.log(err);
      // dequeue();
      enqueue(
        {
          message: err,
        },
        DURATION.short
      );
      return false;
    });
};
