import React, { useEffect, useState, useCallback } from "react";
import { Button } from "baseui/button";
import { Spinner, SIZE } from "baseui/spinner";
import { Block } from "baseui/block";
import { InputStatus } from "./InputStatus";
import { IncidentName } from "./IncidentName";
import { IncidentMessage } from "./IncidentMessage";
import { AffectedComponents } from "./AffectedComponents";
import { getIncidentStatus, getStatus } from "./../../../constants";
import {
  SendComponentObject,
  optionType,
  CreateIncidentProps,
  ComponentObject,
} from "../../../variableTypes";

//NOTE : id used in component is not the actual id of the component. Instead use compId for the same.

export default function CreateIncident(props: CreateIncidentProps) {
  //0 --> data Fetching 1 --> data fetched successfully  2--> cannot fetch data
  const [incidentName, setIncidentName] = useState<string>(props.incidentName);
  const [incidentStatus, setIncidentStatus] = useState<String>(
    props.incidentStatus
  );
  const [incidentMessage, setIncidentMessage] = useState<
    string | number | undefined
  >("");
  const [affectedComponents, setAffectedComponents] = useState<
    ComponentObject[]
  >(props.components);

  useEffect(() => {
    setAffectedComponents(props.components);
  }, [props.components]);

  useEffect(() => {
    setIncidentName(props.incidentName);
  }, [props.incidentName]);

  useEffect(() => {
    setIncidentStatus(props.incidentStatus);
  }, [props.incidentStatus]);

  const handleNameChange = useCallback((e: React.BaseSyntheticEvent) => {
    setIncidentName(e.target.value);
  }, []);

  const updateIncidentMessage = useCallback((e: React.BaseSyntheticEvent) => {
    setIncidentMessage(e.target.value);
  }, []);

  const submitForm = () => {
    console.log(props.currentStateOfPage);
    console.log(incidentName);
    console.log(incidentMessage);
    console.log(incidentStatus);
    console.log(affectedComponents);
    const componentIDs = affectedComponents
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
    affectedComponents.forEach((item) => {
      if (
        item.selected &&
        item.compType != props.components[Number(item.id)].compType
      ) {
        const key = item.compId;
        // Object.assign(components,{ key : getStatus(item.compType}))
        // components = {...components, key: getStatus(item.compType)!}
        components[key] = getStatus(item.compType)!;
      }
    });
    const payload = {
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
        body: incidentMessage,
        components: components,
        component_ids: componentIDs,
        scheduled_auto_transition: true,
      },
    };
    console.log(payload);
    props.handleSubmit(payload);
    // console.log(props.pageID[0]);
  };

  const toggleCheckBox = useCallback(
    (e: React.BaseSyntheticEvent) => {
      console.log(affectedComponents);
      console.log(e);
      const newComponentsAffected = affectedComponents.map(
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
      setAffectedComponents(newComponentsAffected);
    },
    [affectedComponents]
  );

  const changeOption = useCallback(
    (e: optionType, id: String) => {
      const newComponentsAffected = affectedComponents.map(
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
      setAffectedComponents(newComponentsAffected);
    },
    [affectedComponents]
  );

  const updateStatus = useCallback((e: string) => {
    setIncidentStatus(e);
  }, []);

  const formConstant = (
    <>
      <h2>{props.type} Incident</h2>
      <IncidentName value={incidentName} handleNameChange={handleNameChange} />
      <InputStatus
        updateStatus={updateStatus}
        incidentStatus={incidentStatus}
      />
      <IncidentMessage
        value={incidentMessage}
        updateIncidentMessage={updateIncidentMessage}
      />
    </>
  );
  if (props.currentStateOfPage != 2) {
    if (!props.isSubmitClicked) {
      if (props.currentStateOfPage == 1) {
        return (
          <>
            <Block
              overrides={{
                Block: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "20%",
                    paddingRight: "20%",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  },
                },
              }}
            >
              {formConstant}
              <AffectedComponents
                componentList={affectedComponents}
                toggleCheckBox={toggleCheckBox}
                changeOption={changeOption}
              />
              <Button
                onClick={() => {
                  submitForm();
                  // dequeue();
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
                {props.type}
              </Button>
            </Block>
          </>
        );
      } else {
        return (
          <>
            <Block
              overrides={{
                Block: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "80vh",
                  },
                },
              }}
            >
              <Block
                overrides={{
                  Block: {
                    style: {
                      alignSelf: "center",
                    },
                  },
                }}
              >
                <Spinner $size={SIZE.large} />
              </Block>
            </Block>
          </>
        );
      }
    } else {
      return (
        <>
          <Block
            overrides={{
              Block: {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "20%",
                  paddingRight: "20%",
                  fontFamily: "Arial, Helvetica, sans-serif",
                },
              },
            }}
          >
            {formConstant}
            <AffectedComponents
              componentList={affectedComponents}
              toggleCheckBox={toggleCheckBox}
              changeOption={changeOption}
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
              {props.type}
            </Button>
          </Block>
        </>
      );
    }
  } else {
    return (
      <>
        <Block
          overrides={{
            Block: {
              style: {
                display: "flex",
                flexDirection: "column",
                paddingLeft: "20%",
                paddingRight: "20%",
                fontFamily: "Arial, Helvetica, sans-serif",
              },
            },
          }}
        >
          <Block
            overrides={{
              Block: {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "80vh",
                },
              },
            }}
          >
            <h1>Sorry Unable to Fetch Components. Please Try Again</h1>
          </Block>
        </Block>
      </>
    );
  }
}
