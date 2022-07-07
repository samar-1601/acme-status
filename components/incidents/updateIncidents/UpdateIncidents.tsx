//lib
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Router from "next/router";

//components
import IncidentForm from "../internal/form/IncidentForm";
import { useSnackbar, DURATION } from "baseui/snackbar";

//constants
import { STATUS, getIncidentStatusFromPost, PAGE_ID } from "../../../constants";
import { ComponentObject, ComponentsJSONObject } from "../../../types";
import IncidentErrorPage from "../../incidentError/IncidentErrorPage";
import { Block } from "baseui/block";
import TombStone from "../internal/formComponents/TombStone";

//global variable to store component data fetched from API
let InitialData: (ComponentObject | never)[] = [];

interface UpdateIncidentProps {
  incidentId: string | string[] | undefined;
}

interface IncidentFetchType {
  id: string;
  status: string;
}

/**
 * UpdateIncident Component
 * @param props contains:
 * incidentId : ID of the incident to be updated
 */
export default function UpdateIncident(props: UpdateIncidentProps) {
  const [components, setComponents] = useState<ComponentObject[]>([]); //components of incident

  const [incidentName, setIncidentName] = useState<string>(""); //incidentName of incident

  const [incidentStatus, setIncidentStatus] = useState<string>("Investigating"); //incidentStatus of incident

  const [stateOfPage, setStateOfPage] = useState(0); //state of page 0-->loading data 1-->loaded data 2-->cannot load components 3--> wrong incidentUpdate request

  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false); //(true/false) --> isSubmitButton clicked

  const [incidentMessage, setIncidentMessage] = useState<string>("");

  const { enqueue, dequeue } = useSnackbar(); //state for SnackBar

  /**
   * function handleSubmit submits data send by CreateIncident
   * @param payload : data sent by submitForm
   */
  const handleSubmit = React.useCallback((payload: any) => {
    setIsSubmitClicked(true);
    if (payload.incident.name == "") {
      // dequeue();
      enqueue(
        {
          message: "Incident Name can't be Blank!",
        },
        DURATION.short
      );
      setIsSubmitClicked(false);
    } else {
      fetch(
        "https://api.statuspage.io/v1/pages/" +
          PAGE_ID +
          "/incidents/" +
          props.incidentId,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
          },
          body: JSON.stringify(payload),
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
              message: (
                <Block display="flex">
                  <img className="h-6 w-6 mr-1.5" src={"/operational2.webp"} />{" "}
                  <Block>Successfully Updated Incident!!!</Block>
                </Block>
              ),
            },
            DURATION.short
          );
          setIsSubmitClicked(false);
        })
        .then(() => {
          Router.push("/incidents");
        })
        .catch((err) => {
          console.log(err);
          // dequeue();
          // console.log(err);
          enqueue(
            {
              message: (
                <Block display="flex">
                  <img className="h-6 w-6 mr-1.5" src={"/major_outage.png"} />{" "}
                  <Block>Error in Updating Incident</Block>
                </Block>
              ),
            },
            DURATION.short
          );
          setIsSubmitClicked(false);
        });
    }
  }, []);

  //useEffect for fetching components and incidentDetails from API
  useEffect(() => {
    const compURL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components`;
    fetch(compURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        InitialData = json.map((item: ComponentsJSONObject, index: Number) => {
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
        const incidentURL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/incidents/${props.incidentId}`;
        console.log(incidentURL);
        fetch(incidentURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
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
            setIncidentName(json.name);
            setIncidentStatus(getIncidentStatusFromPost(json.status) ?? "");
            setIncidentMessage(json.incident_updates[0].body);
            setStateOfPage(1);
          })
          .catch(() => {
            setStateOfPage(3);
          });
      })
      .catch(() => setStateOfPage(2));
  }, []);

  //If incidentUpdateRequest is wrong
  if (stateOfPage == 0) {
    return <TombStone type={"Update"} />;
  } else if (stateOfPage == 2) {
    return (
      <IncidentErrorPage message="Sorry Unable to Fetch Components. Please Try Again!" />
    );
  }
  if (stateOfPage == 3) {
    return (
      <IncidentErrorPage message="Incident does not exist. Please Check Again!" />
    );
  }
  //otherwise render the form
  else {
    return (
      <IncidentForm
        incidentName={incidentName}
        incidentStatus={incidentStatus}
        components={components}
        isSubmitClicked={isSubmitClicked}
        handleSubmit={handleSubmit}
        incidentMessage={incidentMessage}
        type={"Update"}
      />
    );
  }
}
