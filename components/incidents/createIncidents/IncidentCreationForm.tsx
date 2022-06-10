import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CreateIncident from "./CreateIncident";
import { NEXT_PUBLIC_AUTH_TOKEN } from "../../../constants";

interface JSONObject {
  name: String;
  id: String;
}
export default function IncidentCreationForm() {
  const [pageID, setPageID] = useState([]);
  const URL = "https://api.statuspage.io/v1/pages";
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
        const npageID = json.map((item: JSONObject) => {
          return item.id;
        });
        setPageID(npageID);
      })
      .catch(() => setPageID([]));
  }, []);
  return <CreateIncident pageID={pageID} />;
}
