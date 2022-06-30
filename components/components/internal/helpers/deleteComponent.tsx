import { Block } from "baseui/block";
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
          message: (
            <Block display="flex">
              <img className="h-6 w-6 mr-1.5" src={"/operational2.webp"} />{" "}
              <Block>Successfully Deleted Component!!!</Block>
            </Block>
          ),
        },
        DURATION.long
      );
      props.setLoaded(false);
    })
    .catch((err) => {
      console.log(err);
      props.enqueue(
        {
          message: (
            <Block display="flex">
              <img className="h-6 w-6 mr-1.5" src={"/major_outage.png"} />{" "}
              <Block>${String(err)}</Block>
            </Block>
          ),
        },
        DURATION.short
      );
    });
}