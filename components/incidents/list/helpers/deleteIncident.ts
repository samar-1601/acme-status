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
    .then((response) => {
      if(response.status != 200) {
        throw "Error in Deletion";
      }
      response.json()
    })
    .then(async (json) => {
      console.log(json);
      enqueue(
        {
          message: "Successfully Deleted Incident",
        },
        DURATION.long
      );
      await reFetch();
    })
    .catch((err)=> {
      console.log(err)
      enqueue({
        message: String(err),
      },
      DURATION.short
    );
    })  
};
