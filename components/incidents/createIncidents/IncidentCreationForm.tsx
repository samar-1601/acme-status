import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CreateIncident from "./CreateIncident";
import { NEXT_PUBLIC_AUTH_TOKEN, STATUS } from "../../../constants";
import { ComponentObject, JSONObject, pageData } from "../../../variableTypes";
import { useSnackbar, DURATION } from "baseui/snackbar";
import Router from "next/router";

let InitialData: (ComponentObject | never)[] = [];

export default function IncidentCreationForm() {
  const [components, setComponents] = useState<ComponentObject[]>([]);
  const [stateOfPage, setStateOfPage] = useState(0);
  const [pageID, setPageID] = useState([]);
  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);
  const URL = "https://api.statuspage.io/v1/pages";
  const { enqueue, dequeue } = useSnackbar();

  const handleSubmit = (payload: any) => {
    setIsSubmitClicked(true);
    // dequeue();
    enqueue(
      {
        message: "Submitting Form Details",
        progress: true,
      },
      DURATION.infinite
    );
    fetch("https://api.statuspage.io/v1/pages/" + pageID[0] + "/incidents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dequeue();
        enqueue(
          {
            message: "Successfully submitted form details",
          },
          DURATION.short
        );
        setIsSubmitClicked(false);
      })
      .then(() => {
        Router.push("/");
      })
      .catch((err) => {
        console.log(err);
        dequeue();
        enqueue(
          {
            message: "Sorry not able to submit form",
          },
          DURATION.long
        );
        setIsSubmitClicked(false);
      });
  };

  useEffect(() => {
    fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const npageID = json.map((item: pageData) => {
          return item.id;
        });
        const compURL = `https://api.statuspage.io/v1/pages/${npageID[0]}/components`;
        fetch(compURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            InitialData = json.map((item: JSONObject, index: Number) => {
              return {
                compName: item.name,
                compType: STATUS[item.status],
                id: index,
                compId: item.id,
                selected: false,
              };
            });
            setComponents(InitialData);
            setStateOfPage(1);
            setPageID(npageID);
            // console.log("setting");
          })
          .catch(() => setStateOfPage(2));
      })
      .catch(() => setStateOfPage(2));
  }, []);
  return (
    <CreateIncident
      components={components}
      currentStateOfPage={stateOfPage}
      isSubmitClicked={isSubmitClicked}
      handleSubmit={handleSubmit}
      incidentName={""}
      incidentStatus={"Investigating"}
      type={"Create"}
    />
  );
}
