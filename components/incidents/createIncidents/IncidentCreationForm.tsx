//lib
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Router from "next/router";

//components
import CreateIncident from "./CreateIncident";
import { ComponentObject, JSONObject, pageData } from "../../../variableTypes";
import { useSnackbar, DURATION } from "baseui/snackbar";

//constants
import { NEXT_PUBLIC_AUTH_TOKEN, STATUS } from "../../../constants";

//variable to load the initial data from api call
let InitialData: (ComponentObject | never)[] = [];

/**
 * Incident Creation Form
 * Parent component of Incident Creation Form. Wraps the Form.
 * Sends components, currentStateofPage, isSubmitClicked, incidentName, incidentStatus and type as props to CreateIncident
 * As this is IncidentCreationForm incidentName, incidentStatus and components will be the default values
 * Responsible for fetching data from API.
 */

export default function IncidentCreationForm() {
  const [components, setComponents] = useState<ComponentObject[]>([]); // stores components fetched from API
  const [stateOfPage, setStateOfPage] = useState(0); //stores state of Page 0-->fetching data 1-->fetched data 2-->cannot fetch data
  const [pageID, setPageID] = useState([]); //stores page id of site
  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false); //stores if submit button is clicked or not. If clicked then loading state of cursor
  const URL = "https://api.statuspage.io/v1/pages"; //URL for fetching page
  const { enqueue, dequeue } = useSnackbar(); //snackBar hook

  const handleSubmit = (payload: any) => {
    /**
     * @params payload: sent by submitForm function of CreateIncident
     * Post the data to the API.
     * First case --> post successful then redirect to home url
     * Second case --> post unsuccessful show error message in snackbar
     */
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
        if ("error" in json) {
          throw json.error;
        }
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
      .catch((err = "Sorry not able to submit form") => {
        console.log(err);
        dequeue();
        enqueue(
          {
            message: err,
          },
          DURATION.long
        );
        setIsSubmitClicked(false);
      });
  };

  //will execute on component mounting gets data from API sets it and sends to CreateIncident
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
