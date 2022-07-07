//lib
import React, { useState, useCallback } from "react";
import Link from "next/link";

//components
import { Spinner, SIZE } from "baseui/spinner";
import { Block } from "baseui/block";
import { InputStatus } from "../formComponents/InputStatus";
import { IncidentName } from "../formComponents/IncidentName";
import { IncidentMessage } from "../formComponents/IncidentMessage";
import { AffectedComponents } from "../formComponents/AffectedComponents";

//constants
import { getIncidentStatus, getStatus } from "../../../../constants";
import { ComponentObject } from "../../../../types";

//styles
import {
  FOOTER_BAR_OVERRIDES,
  MAIN_STYLE_OVERRIDES,
  CANCEL_BUTTON_OVERRIDES,
  SUBMIT_BUTTON_OVERRIDES,
  ONSUBMIT_BUTTON_STYLE_OVERRIDES,
} from "./overrides/BlockOverrides";
import { getDefaultMessageFromStatus } from "../helpers/helperFunctions";

//NOTE : id used in component is not the actual id of the component. Instead use compId for the same.

/**
 *
 * @param props contains
 * components : contains component list isSelected and choiceType
 * currentStateofPage : 0 --> data Fetching 1 --> data fetched successfully  2--> cannot fetch data
 * isSubmitClicked: true or false
 * incidentName: empty in case of IncidentCreation and not empty in case of UpdateIncident
 * incidentStatus: status of the incident(default: Investigating)
 * @returns
 */

interface SendComponentObject {
  [key: string]: string;
}

interface optionType {
  option: {
    id: Number;
  };
}

interface IncidentCreationProps {
  components: ComponentObject[];
  isSubmitClicked: boolean;
  handleSubmit: Function;
  incidentName: string;
  incidentStatus: string;
  incidentMessage: string;
  type: string;
}

export default function IncidentForm(props: IncidentCreationProps) {
  //0 --> data Fetching 1 --> data fetched successfully  2--> cannot fetch data
  const [incidentName, setIncidentName] = useState<string>(props.incidentName); //state for incidentName

  const [incidentStatus, setIncidentStatus] = useState<String>(
    props.incidentStatus
  ); //state for incident incidentStatus

  const [incidentMessage, setIncidentMessage] = useState<
    string | number | undefined
  >(props.incidentMessage); //state for incident message

  const [affectedComponents, setAffectedComponents] = useState<
    ComponentObject[]
  >(props.components); //state for storing checked and selected type of components

  const [isMessageEntered, setIsMessageEntered] = useState<boolean>(false); //state for storing whether message has been entered by user

  //function for handing name change
  const handleNameChange = useCallback((e: React.BaseSyntheticEvent) => {
    setIncidentName(e.target.value);
  }, []);

  //function for handling message change
  const updateIncidentMessage = useCallback((e: React.BaseSyntheticEvent) => {
    setIsMessageEntered(true);
    setIncidentMessage(e.target.value);
  }, []);

  /**
   * Function handleComponentUpdate
   * @params idx, selected, optionType
   * idx: index value of the component to be changed
   * selected: selected value (true/false) of the changed Component
   * optionType: selected status of the changed Component
   */
  const handleComponentUpdate = useCallback(
    (idx: number, selected: boolean, optionType: number) => {
      setAffectedComponents((prevAffectedComponents) => {
        const newAffectedComponents = prevAffectedComponents.map(
          (value, index) => {
            //change only the idx th array item
            if (index == idx) {
              return {
                compName: value.compName,
                compType: optionType,
                id: value.id,
                compId: value.compId,
                selected: selected,
              };
            } else {
              return value;
            }
          }
        );
        return newAffectedComponents;
      });
    },
    []
  );

  //function to handle IncidentStatus Update
  const updateStatus = useCallback(
    (e: string) => {
      console.log("here is the status", e);
      setIncidentStatus(e);
      if (isMessageEntered === false) {
        setIncidentMessage(getDefaultMessageFromStatus(e));
      }
    },
    [isMessageEntered]
  );

  //sends all the data of state to props.handleSubmit in the form payload
  const submitForm = () => {
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
    //get those components changed their status from initial value
    affectedComponents.forEach((item) => {
      if (
        item.selected &&
        item.compType != props.components[Number(item.id)].compType
      ) {
        const key = item.compId;
        components[key] = getStatus(item.compType)!;
      }
    });
    const payload = {
      incident: {
        name: incidentName,
        status: getIncidentStatus(incidentStatus), //changed status components
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
        component_ids: componentIDs, //all the component ids which were selected
        scheduled_auto_transition: true,
      },
    };
    console.log(payload);
    props.handleSubmit(payload);
  };

  //part of form which will remain constant for both true and false values of props.isSubmitClicked
  const formConstant = (
    <>
      <h2 className="header my-3.5">{props.type} Incident</h2>
      <IncidentName value={incidentName} handleNameChange={handleNameChange} />
      <InputStatus
        updateStatus={updateStatus}
        incidentStatus={incidentStatus}
      />
      <IncidentMessage
        value={incidentMessage}
        updateIncidentMessage={updateIncidentMessage}
      />
      <AffectedComponents
        componentList={affectedComponents}
        handleComponentUpdate={handleComponentUpdate}
      />
    </>
  );

  //if submitButton has not been clicked
  if (!props.isSubmitClicked) {
    return (
      <>
        <Block overrides={{ ...MAIN_STYLE_OVERRIDES }}>
          {formConstant}
          <Block overrides={{ ...FOOTER_BAR_OVERRIDES }} className="footer-bar">
            <Block
              className="primary-button"
              onClick={() => {
                submitForm();
              }}
              overrides={{ ...SUBMIT_BUTTON_OVERRIDES }}
            >
              {props.type}
            </Block>
            <Link href={{ pathname: "/incidents" }}>
              <Block
                className="secondary-button"
                overrides={{ ...CANCEL_BUTTON_OVERRIDES }}
              >
                Cancel
              </Block>
            </Link>
          </Block>
        </Block>
      </>
    );
  }
  //if submitbutton has been clicked
  else {
    return (
      <>
        <Block overrides={{ ...MAIN_STYLE_OVERRIDES }}>
          {formConstant}
          <Block overrides={{ ...FOOTER_BAR_OVERRIDES }} className="footer-bar">
            <Block
              className="primary-button"
              onClick={() => {
                submitForm();
              }}
              overrides={{ ...ONSUBMIT_BUTTON_STYLE_OVERRIDES }}
            >
              <Spinner $size={SIZE.small} />
            </Block>
            <Link href={{ pathname: "/incidents" }}>
              <Block
                className="secondary-button"
                overrides={{ ...CANCEL_BUTTON_OVERRIDES }}
              >
                Cancel
              </Block>
            </Link>
          </Block>
        </Block>
      </>
    );
  }
}
