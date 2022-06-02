import { useState, useEffect } from "react";
import { Tabs, Tab } from "baseui/tabs-motion";
import { OpenListView } from "./open_list_view";

export const HeaderTabs: React.FC = () => {
  const [activeKey, setActiveKey] = useState<number>(0);

  // getting the page ids for the next call
  const [dataList, setData] = useState([]);
  const URL = "https://api.statuspage.io/v1/pages";
  const getData = () => {
    fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    })
      .then((response) => response.json())
      .then((myJson) => setData(myJson));
  };

  useEffect(() => {
    getData();    
  }, []);

  const idList:string[] = dataList.map((data) => data["id"]);

  return (
    <Tabs
      activeKey={activeKey}
      onChange={({ activeKey }) => {
        setActiveKey(Number(activeKey));
      }}
      activateOnFocus
      overrides={{
        TabBorder: {
          style: () => ({
            backgroundColor: "#DCDCDC",
          }),
        },
        TabHighlight: {
          style: () => ({
            backgroundColor: "blue",
          }),
        },
      }}
    >
      <Tab title="Open">
        <OpenListView idList={idList} />
      </Tab>
      <Tab title="Incidents" disabled>
        Incidents
      </Tab>
      <Tab title="Maintainances" disabled>
        Maintainances
      </Tab>
    </Tabs>
  );
};
