import { DURATION } from "baseui/snackbar";
import { PAGE_ID } from "../../../../constants";

export const deleteComponent = function (props: any) {
  fetch(
    "https://api.statuspage.io/v1/pages/" +
      PAGE_ID +
      "/components/" +
      props.id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${
          process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""
        }`,
      },
    }
  )
    .then((response) => {
      if (response.status != 204) {
        throw "Error in Deletion";
      }
      props.enqueue(
        {
          message: "Successfully Deleted Component",
        },
        DURATION.long
      );
      props.setLoaded(false);
    })
    .catch((err) => {
      console.log(err);
      props.enqueue(
        {
          message: String(err),
        },
        DURATION.short
      );
    });
}