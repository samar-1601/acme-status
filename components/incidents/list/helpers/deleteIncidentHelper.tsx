import { Block } from "baseui/block";
import { DURATION } from "baseui/snackbar";

export const deleteIncident = async (
  incidentId: string,
  enqueue: Function,
  reFetch: any,
  setIsLoading: Function
) => {
  fetch(
    "https://api.statuspage.io/v1/pages/" +
      process.env.NEXT_PUBLIC_PAGE_ID +
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
      if (response.status != 200) {
        throw "Error in Deletion";
      }
      response.json();
    })
    .then(async (json) => {
      console.log(json);
      enqueue(
        {
          message: (
            <Block display="flex">
              <img className="h-6 w-6 mr-1.5" src={"/operational2.webp"} />{" "}
              <Block>Successfully Deleted Incident!!!</Block>
            </Block>
          ),
        },
        DURATION.short
      );
      setIsLoading(false);
      await reFetch();
    })
    .catch((err) => {
      console.log(err);
      enqueue(
        {
          message: (
            <Block display="flex">
              <img className="h-6 w-6 mr-1.5" src={"/major_outage.png"} />{" "}
              <Block>{String(err)}</Block>
            </Block>
          ),
        },
        DURATION.short
      );
    });
};
