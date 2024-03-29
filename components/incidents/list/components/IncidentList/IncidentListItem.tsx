// lib
import * as React from "react";

// components
import { Block } from "baseui/block";
import { ComponentsListForIncident } from "./ComponentListForIncidentItem";
import Link from "next/link";

// styles
import {
  ITEM_DETAILS_OVERRIDES,
  LIST_ITEM_OVERRIDES,
  ITEM_STATUS,
  ITEM_DATE_OVERRIDES,
  ITEM_DETAILS_SECOND_LINE_OVERRIDES,
  ITEM_NAME_OVERRIDES,
  BUTTON_AREA,
  ITEM_DETAILS_FIRST_TWO_LINES_WRAPPER_OVERRIDES,
  ITEM_FIRST_PART_LEFT_OVERRIDES,
} from "../../overrides/listStyles";

// helpers
import { deleteIncident } from "../../helpers/deleteIncidentHelper";
import { formatDate } from "../../helpers/formatDate";

interface Props {
  incident: any;
  reFetch: any;
  enqueue: Function;
  setIsLoading: Function;
}
/**
 * incident formatted for rendering in the incident list
 * @param incident data recieved from the API
 * @returns JSX component list
 */
export const RenderIncidentData: React.FC<Props> = React.memo(
  ({ incident, reFetch, enqueue, setIsLoading }): JSX.Element => {
    return (
      <Block
        key={incident["name"]}
        overrides={LIST_ITEM_OVERRIDES}
        className="list-item"
      >
        <Block overrides={ITEM_DETAILS_OVERRIDES}>
          <Block overrides={ITEM_DETAILS_FIRST_TWO_LINES_WRAPPER_OVERRIDES}>
            <Block overrides={ITEM_FIRST_PART_LEFT_OVERRIDES}>
              <Block overrides={ITEM_NAME_OVERRIDES}>{incident["name"]}</Block>
              <Block overrides={ITEM_DETAILS_SECOND_LINE_OVERRIDES}>
                <Block overrides={ITEM_STATUS}>{incident["status"]}</Block>
                <Block overrides={ITEM_DATE_OVERRIDES}>
                  {formatDate(incident["created_at"])}
                </Block>
              </Block>
            </Block>
            <Block overrides={BUTTON_AREA} className="button-area">
              <Link
                href={{
                  pathname: `/incidents/edit/${incident["id"]}`, // send the incident ID to the update page address
                }}
              >
                <Block className="edit-icon-wrapper">
                  <Block
                    overrides={{
                      Block: {
                        style: { borderRadius: "9999px", padding: "7px" },
                      },
                    }}
                  >
                    <svg
                      data-spaceweb="icon"
                      viewBox="0 0 12 8.5"
                      data-icon-name="LineEdit"
                      className="sw--cv sw--dn sw--m2 sw--m3 edit-icon"
                      height={21}
                      width={21}
                    >
                      <path d="M3.4 8.5H.5a.5.5 0 110-1h2.9a.5.5 0 01.5.5.5.5 0 01-.5.5zm8.1-8C11-.2 10-.2 9.3.4l-4 4a1.5 1.5 0 00-.4.8l-.3 1.5a.5.5 0 00.5.6L6.8 7c.3 0 .5-.2.7-.4l4-4a1.5 1.5 0 00.5-1.2 1.6 1.6 0 00-.5-1zm-.7 1.4l-4 4a.6.6 0 01-.3.2l-.8.2.2-.9a.5.5 0 01.1-.3l4-4a.6.6 0 01.8 0 .6.6 0 010 .8z" />
                    </svg>
                  </Block>
                </Block>
              </Link>
              <Block
                onClick={() => {
                  deleteIncident(
                    incident["id"],
                    enqueue,
                    reFetch,
                    setIsLoading
                  );
                }}
                className="edit-icon-wrapper"
              >
                <Block
                  overrides={{
                    Block: {
                      style: { borderRadius: "9999px", padding: "9px" },
                    },
                  }}
                >
                  <svg
                    data-spaceweb="icon"
                    viewBox="0 0 14 14"
                    data-icon-name="SolidDelete"
                    className="sw--cv sw--dn sw--m2 sw--m3 edit-icon"
                    height={18}
                    width={18}
                  >
                    <path d="M13.418 1.386h-5.8V.6a.582.582 0 00-1.166 0v.787H.582a.582.582 0 100 1.165h.34l1.096 8.442a.583.583 0 00.071.208c.417 1.845 1.39 2.754 2.983 2.754h4.071c1.37 0 2.43-1.163 2.755-2.973a.566.566 0 00.027-.082l1.121-8.35h.372a.582.582 0 100-1.164zm-8.624 9.711a.472.472 0 01-.052.002.58.58 0 01-.579-.53l-.51-5.837a.584.584 0 011.16-.102l.51 5.836a.583.583 0 01-.529.631zm2.81-.58a.582.582 0 11-1.164 0V4.66a.582.582 0 111.164 0zm2.267.05v.003a.58.58 0 01-.63.526h-.003a.58.58 0 01-.526-.63l.51-5.836a.582.582 0 111.16.102z" />
                  </svg>
                </Block>
              </Block>
            </Block>
          </Block>
          <ComponentsListForIncident incident={incident} />
        </Block>
      </Block>
    );
  }
);
