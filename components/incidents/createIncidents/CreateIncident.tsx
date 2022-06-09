import { Button } from "baseui/button";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/CreateIncident.module.css";
import { Spinner, SIZE } from "baseui/spinner";
import InputStatus from "./InputStatus";
import IncidentName from "./IncidentName";
import IncidentMessage from "./IncidentMessage";
import ComponentsAffected from "./ComponentsAffected";
import { NEXT_PUBLIC_AUTH_TOKEN } from "./../../../constants";
import { ComponentObject } from "../../../variableTypes";
import Router from "next/router";
import { Block } from "baseui/block";
import { STATUS } from "./../../../constants";
import {
  SendComponentObject,
  SpecialEvent,
  JSONObject,
  optionType,
  CreateIncidentProps,
} from "../../../variableTypes";
import { useSnackbar, DURATION } from "baseui/snackbar";

const getStatus = (id: number) => {
  switch (id) {
    case 1:
      return "operational";
    case 2:
      return "degraded_performance";
    case 3:
      return "partial_outage";
    case 4:
      return "major_outage";
    case 5:
      return "under_maintenance";
  }
};

const getIncidentStatus = (id: String) => {
  switch (id) {
    case "Investigating":
      return "scheduled";
    case "Identified":
      return "in_progress";
    case "Monitoring":
      return "verifying";
    case "Resolved":
      return "completed";
  }
};

let InitialData: (ComponentObject | never)[] = [];

//NOTE : id used in component is not the actual id of the component. Instead use compId for the same.

export default function CreateIncident(props: CreateIncidentProps) {
  const [currentStateOfPage, setCurrentStateOfPage] = useState<number>(0); //0 --> data Fetching 1 --> data fetched successfully  2--> cannot fetch data
  const [incidentName, setIncidentName] = useState<string>("");
  const [incidentStatus, setIncidentStatus] = useState<String>("Investigating");
  const [incidentMessage, setIncidentMessage] = useState<String>("");
  const [componentsAffected, setComponentsAffected] = useState<
    ComponentObject[]
  >([]);
  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);
  const { enqueue, dequeue } = useSnackbar();

  useEffect(() => {
    const pageID = props.pageID;
    pageID.forEach((page: String) => {
      const URL = `https://api.statuspage.io/v1/pages/${page}/components`;
      fetch(URL, {
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
          setComponentsAffected(InitialData);
          setCurrentStateOfPage(1);
        })
        .catch(() => {
          setCurrentStateOfPage(2);
        });
    });
  }, [props.pageID]);

  // useEffect(() => {
  //     console.log(isLoaded);
  //     console.log(incidentName);
  //     console.log(incidentMessage);
  //     console.log(incidentStatus);
  //     console.log(componentsAffected);
  // })
  const handleNameChange = (e: React.BaseSyntheticEvent) => {
    setIncidentName(e.target.value);
  };

  const updateIncidentMessage = (e: React.BaseSyntheticEvent) => {
    setIncidentMessage(e.target.value);
  };

  const submitForm = () => {
    console.log(currentStateOfPage);
    console.log(incidentName);
    console.log(incidentMessage);
    console.log(incidentStatus);
    console.log(componentsAffected);
    const componentIDs = componentsAffected
      .filter(function (item) {
        if (!item.selected) {
          return false;
        }
        return true;
      })
      .map(function (item) {
        return item.compId;
      });
    let components: SendComponentObject = {};
    componentsAffected.forEach((item) => {
      if (
        item.selected &&
        item.compType != InitialData[Number(item.id)].compType
      ) {
        const key = item.compId;
        // Object.assign(components,{ key : getStatus(item.compType}))
        // components = {...components, key: getStatus(item.compType)!}
        components[key] = getStatus(item.compType)!;
      }
    });
    const submit = {
      incident: {
        name: incidentName,
        status: getIncidentStatus(incidentStatus),
        impact_override: "none",
        scheduled_for: "2022-09-12T06:00:00.007Z",
        scheduled_until: "2022-10-12T06:00:00.007Z",
        scheduled_remind_prior: true,
        scheduled_auto_in_progress: true,
        scheduled_auto_completed: true,
        metadata: {},
        deliver_notifications: true,
        auto_transition_deliver_notifications_at_end: true,
        auto_transition_deliver_notifications_at_start: true,
        auto_transition_to_maintenance_state: true,
        auto_transition_to_operational_state: true,
        backfill_date: "string",
        backfilled: false,
        body: "string",
        components: components,
        component_ids: componentIDs,
        scheduled_auto_transition: true,
      },
    };
    console.log(submit);
    console.log(props.pageID[0]);
    fetch(
      "https://api.statuspage.io/v1/pages/" + props.pageID[0] + "/incidents",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
        },
        body: JSON.stringify(submit),
      }
    )
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

  const toggleCheckBox = (e: React.BaseSyntheticEvent) => {
    const newComponentsAffected = componentsAffected.map(
      (item: ComponentObject) => {
        if (item.id == e.target.name) {
          return {
            compName: item.compName,
            compType: item.compType,
            id: item.id,
            compId: item.compId,
            selected: !item.selected,
          };
        } else {
          return item;
        }
      }
    );
    setComponentsAffected(newComponentsAffected);
  };

  const changeOption = (e: optionType, id: String) => {
    const newComponentsAffected = componentsAffected.map(
      (item: ComponentObject) => {
        if (item.id.toString() == id) {
          return {
            compName: item.compName,
            compType: Number(e.option.id) + 1,
            id: item.id,
            compId: item.compId,
            selected: item.selected,
          };
        } else {
          return item;
        }
      }
    );
    setComponentsAffected(newComponentsAffected);
  };

  const updateStatus = (e: React.BaseSyntheticEvent) => {
    setIncidentStatus(e.target.innerHTML);
  };

  const updateStatusBarOnClick = (e: SpecialEvent) => {
    let percentage = 0;
    let native = e.nativeEvent.offsetX;
    if (!e.target.classList.contains("bar")) {
      console.log("YES!!!!");
      let substractedTo = 0;
      if (incidentStatus == "Identified") {
        substractedTo = (66 / 100) * e.target.offsetWidth;
      } else if (incidentStatus == "Monitoring") {
        substractedTo = (33 / 100) * e.target.offsetWidth;
      }
      percentage =
        ((e.nativeEvent.offsetX - substractedTo) * 100) / e.target.offsetWidth;
    } else {
      percentage = (e.nativeEvent.offsetX * 100) / e.target.offsetWidth;
      console.log("NO!!!!");
    }
    if (percentage < 16) {
      setIncidentStatus("Investigating");
    } else if (percentage < 50) {
      setIncidentStatus("Identified");
    } else if (percentage < 83) {
      setIncidentStatus("Monitoring");
    } else {
      setIncidentStatus("Resolved");
    }
  };

  const formConstant = (
    <>
      <h2>Create Incident</h2>
      <IncidentName
        value={incidentName}
        handleNameChange={(e: React.BaseSyntheticEvent) => handleNameChange(e)}
      />
      <InputStatus
        updateStatus={(e: React.BaseSyntheticEvent) => updateStatus(e)}
        incidentStatus={incidentStatus}
        updateStatusBarOnClick={(event: SpecialEvent) =>
          updateStatusBarOnClick(event)
        }
      />
      <IncidentMessage
        value={incidentMessage}
        updateIncidentMessage={(e: React.BaseSyntheticEvent) =>
          updateIncidentMessage(e)
        }
      />
    </>
  );
  if (currentStateOfPage != 2) {
    if (!isSubmitClicked)
      return (
        <>
          <div className={styles.main}>
            {formConstant}
            {currentStateOfPage == 1 ? (
              <>
                <ComponentsAffected
                  componentList={componentsAffected}
                  toggleCheckBox={(e: React.BaseSyntheticEvent) =>
                    toggleCheckBox(e)
                  }
                  changeOption={(e: optionType, id: String) =>
                    changeOption(e, id)
                  }
                />
                <Button
                  onClick={() => {
                    setIsSubmitClicked(true);
                    submitForm();
                    // dequeue();
                    enqueue(
                      {
                        message: "Submitting Form Details",
                        progress: true,
                      },
                      DURATION.infinite
                    );
                  }}
                  overrides={{
                    BaseButton: {
                      style: ({ $theme }) => ({
                        backgroundColor: $theme.colors.accent,
                        width: "80px",
                        alignSelf: "end",
                      }),
                    },
                  }}
                >
                  Create
                </Button>
              </>
            ) : (
              <div className={styles.Spinner}>
                <Spinner $size={SIZE.large} />
              </div>
            )}
          </div>
        </>
      );
    else {
      return (
        <>
          <div className={styles.main}>
            {formConstant}
            {currentStateOfPage == 1 ? (
              <>
                <ComponentsAffected
                  componentList={componentsAffected}
                  toggleCheckBox={(e: React.BaseSyntheticEvent) =>
                    toggleCheckBox(e)
                  }
                  changeOption={(e: optionType, id: String) =>
                    changeOption(e, id)
                  }
                />
                <Button
                  overrides={{
                    BaseButton: {
                      style: ({ $theme }) => ({
                        backgroundColor: $theme.colors.accent,
                        width: "80px",
                        alignSelf: "end",
                        cursor: "wait",
                      }),
                    },
                  }}
                >
                  Create
                </Button>
              </>
            ) : (
              <div className={styles.Spinner}>
                <Spinner $size={SIZE.large} />
              </div>
            )}
          </div>
        </>
      );
    }
  } else {
    return (
      <>
        <div className={styles.main}>
          {formConstant}
          <Block
            overrides={{
              Block: {
                style: {
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                },
              },
            }}
          >
            <h1>Sorry Unable to Fetch Components</h1>
          </Block>
        </div>
      </>
    );
  }
}
