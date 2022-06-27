import { DURATION } from "baseui/snackbar";
import Router from "next/router";
import { PAGE_ID } from "../../../constants";

export const DeleteIncident = (incidentId: string, enqueue: Function) => {
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
    .then((json) => {
      console.log(json);
      if ("error" in json) {
        throw json.error;
      }
      // throw json;
      // dequeue();
      enqueue(
        {
          message: "Successfully Deleted Incident",
        },
        DURATION.short
      );
    })
    .then(() => {
      Router.reload();
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
      //   setIsSubmitClicked(false);
    });
};
