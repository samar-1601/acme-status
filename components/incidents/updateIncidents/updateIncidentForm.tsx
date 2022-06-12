import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CreateIncident from "../createIncidents/CreateIncident";
import {
  NEXT_PUBLIC_AUTH_TOKEN,
  STATUS,
  getIncidentStatusFromPost,
} from "../../../constants";
import {
  ComponentObject,
  JSONObject,
  pageData,
  UpdateIncidentFormProps,
  IncidentFetchType,
} from "../../../variableTypes";
import { useSnackbar, DURATION } from "baseui/snackbar";
import Router from "next/router";

let InitialData: (ComponentObject | never)[] = [];

export default function UpdateIncidentForm(props: UpdateIncidentFormProps) {
  console.log(props.incidentId);
  const [components, setComponents] = useState<ComponentObject[]>([]);
  const [incidentName, setIncidentName] = useState<string>("");
  const [incidentStatus, setIncidentStatus] = useState<string>("Investigating");
  const [stateOfPage, setStateOfPage] = useState(0);
  const [pageID, setPageID] = useState([]);
  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);
  const URL = "https://api.statuspage.io/v1/pages";
  const { enqueue, dequeue } = useSnackbar();

  const handleSubmit = (payload: any) => {
    setIsSubmitClicked(true);
    console.log("Updating Incident");
    // dequeue();
    enqueue(
      {
        message: "Updating Incident Details",
        progress: true,
      },
      DURATION.infinite
    );
    fetch(
      "https://api.statuspage.io/v1/pages/" +
        pageID[0] +
        "/incidents/" +
        props.incidentId,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
        },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dequeue();
        enqueue(
          {
            message: "Successfully updated Incident",
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
            message: "Sorry not able to update incident",
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
            // setComponents(InitialData);
            // console.log("setting");
          })
          .then(() => {
            const incidentURL = `https://api.statuspage.io/v1/pages/${npageID}/incidents/${props.incidentId}`;
            console.log(incidentURL);
            fetch(incidentURL, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
              },
            })
              .then((response) => response.json())
              .then((json) => {
                console.log(json);
                console.log(InitialData);
                json.components.forEach((item: IncidentFetchType) => {
                  let obj: ComponentObject = InitialData.find(
                    (o) => o.compId === item.id
                  )!;
                  InitialData[Number(obj.id)].selected = true;
                  InitialData[Number(obj.id)].compType = STATUS[item.status];
                });
                console.log(InitialData);
                setComponents(InitialData);
                setStateOfPage(1);
                setIncidentName(json.name);
                setIncidentStatus(getIncidentStatusFromPost(json.status));
                setPageID(npageID);
              })
              .catch(() => setStateOfPage(2));
          })
          .catch(() => setStateOfPage(2));
      })
      .catch(() => setStateOfPage(2));
  }, []);
  return (
    <CreateIncident
      incidentName={incidentName}
      incidentStatus={incidentStatus}
      components={components}
      currentStateOfPage={stateOfPage}
      isSubmitClicked={isSubmitClicked}
      handleSubmit={handleSubmit}
      type={"Update"}
    />
  );
}
