import { Block } from "baseui/block";
import { DURATION } from "baseui/snackbar";
import Router from "next/router";
import { PAGE_ID } from "../../../../constants";

export const updateComponent = function (props: any) {
  fetch(
    "https://api.statuspage.io/v1/pages/" + PAGE_ID + "/components/" + props.id,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
      body: JSON.stringify(props.payload),
    }
  )
    .then((response) => response.json())
    .then((json) => {
      if ("error" in json) {
        throw json.error;
      }
      props.enqueue(
        {
          message: (
            <Block display="flex">
              <img className="h-6 w-6 mr-1.5" src={"/operational2.webp"} />{" "}
              <Block>Successfully Updated Component!!!</Block>
            </Block>
          ),
        },
        DURATION.medium
      );
      props.setSubmit(false);
    })
    .then(() => {
      Router.push("/component");
    })
    .catch((err) => {
      props.enqueue(
        {
          message: (
            <Block display="flex">
              <img className="h-6 w-6 mr-1.5" src={"/major_outage.png"} />{" "}
              <Block>Failed to Submit Form. Please Try Again!!!</Block>
            </Block>
          ),
        },
        DURATION.short
      );
      props.setSubmit(false);
      console.log(err);
    });
};
