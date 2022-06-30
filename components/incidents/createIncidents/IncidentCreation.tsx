//lib
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Router from "next/router";

//components
import IncidentForm from "../internal/form/IncidentForm";
import { ComponentObject, ComponentsJSONObject } from "../../../types";
import { useSnackbar, DURATION } from "baseui/snackbar";

//constants
import { STATUS, PAGE_ID } from "../../../constants";
import { Block } from "baseui/block";

//variable to load the initial data from api call
let InitialData: (ComponentObject | never)[] = [];

/**
 * Incident Creation
 * Has IncidentForm as child component. Wraps the Form.
 * Sends components, currentStateofPage, isSubmitClicked, incidentName, incidentStatus and type as props to CreateIncident
 * As this is IncidentCreation incidentName, incidentStatus and components will be the default values
 * Responsible for fetching data from API.
 */

export default function IncidentCreation() {
  const [components, setComponents] = useState<ComponentObject[]>([]); // stores components fetched from API
  const [stateOfPage, setStateOfPage] = useState(0); //stores state of Page 0-->fetching data 1-->fetched data 2-->cannot fetch data
  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false); //stores if submit button is clicked or not. If clicked then loading state of cursor
  const { enqueue, dequeue } = useSnackbar(); //snackBar hook

  const handleSubmit = React.useCallback((payload: any) => {
    /**
     * @params payload: sent by submitForm function of CreateIncident
     * Post the data to the API.
     * First case --> post successful then redirect to home url
     * Second case --> post unsuccessful show error message in snackbar
     */
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
      fetch("https://api.statuspage.io/v1/pages/" + PAGE_ID + "/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((json) => {
          //if successful POST show Successfully submitted form details in SnackBar
          if ("error" in json) {
            throw json.error; //if 422 error in POST throw error to catch section
          }
          console.log(json);
          // dequeue();
          enqueue(
            {
              message: (
                <Block display="flex">
                  <img className="h-6 w-6 mr-1.5" src={"/operational2.webp"} />{" "}
                  <Block>Successfully Created Incident!!!</Block>
                </Block>
              ),
            },
            DURATION.short
          );
          setIsSubmitClicked(false);
        })
        .then(() => {
          //After successful POST redirect to home route
          Router.push("/incidents");
        })
        //default value will be displayed in case of fetch error otherwise value passed in err will be displayed
        .catch((err) => {
          //display error in snackBar and set loading state of cursor to false
          // dequeue();
          enqueue(
            {
              message: (
                <Block display="flex">
                  <img className="h-6 w-6 mr-1.5" src={"/major_outage.png"} />{" "}
                  <Block>Failed To Submit Form. Please Try Again!!!</Block>
                </Block>
              ),
            },
            DURATION.short
          );
          setIsSubmitClicked(false);
          console.log(err);
        });
    }
  }, []);

  //will execute on component mounting gets data from API sets it and sends to CreateIncident
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
        //convert the data fetched from API to ComponentObject[] and store in global variable InitialData
        InitialData = json.map((item: ComponentsJSONObject, index: Number) => {
          return {
            compName: item.name,
            compType: STATUS[item.status],
            id: index,
            compId: item.id,
            selected: false,
          };
        });
        setComponents(InitialData); //set state of components to InitialData
        setStateOfPage(1); //set state of page to succesfully fetched data
        // console.log("setting");
      })
      .catch(() => setStateOfPage(2)); //if error in fetching set state of page to 2 ("Sorry not able to fetch components")
  }, []);
  return (
    <IncidentForm
      components={components}
      currentStateOfPage={stateOfPage}
      isSubmitClicked={isSubmitClicked}
      handleSubmit={handleSubmit}
      incidentName={""}
      incidentStatus={"Investigating"}
      type={"Create"} //sets formType to createIncident
    />
  );
}
