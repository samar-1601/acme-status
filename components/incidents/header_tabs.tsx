import { useState, useEffect } from "react";
import { Tabs, Tab } from "baseui/tabs-motion";
import { OpenListView } from "./open_list_view";
import { NEXT_PUBLIC_AUTH_TOKEN } from "../../constants.js";
import styles from "./styles.module.css";
import { StyledSpinnerNext } from "baseui/spinner";

export const HeaderTabs: React.FC = () => {
  const [activeKey, setActiveKey] = useState<number>(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  // getting the page ids for the next call
  const [dataList, setData] = useState([]);
  let idList: string[] | undefined = [];

  const getIDData = async () => {
    const URL = "https://api.statuspage.io/v1/pages";
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const myJson = await response.json();
    setData(myJson);
    idList = myJson.map((data: any) => data["id"]);
    if(idList!==undefined)
    {
      idList.forEach(getData);
    }
  };
  
  const getData = async (pageId: string) => {
    const URL = `https://api.statuspage.io/v1/pages/${pageId}/incidents`;
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const dataItem = await response.json();
    setData(dataItem);
    setHasLoaded(true);
  };

  useEffect(() => {
    getIDData();
    console.log("here")
  }, []);

  console.log(dataList);

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
      <Tab title="All">
        {hasLoaded ? (
          <OpenListView dataList={dataList} />
        ) : (
          <div className={styles.spinner}>
            <StyledSpinnerNext />
          </div>
        )}
      </Tab>
      <Tab title="Active">
        <OpenListView dataList={dataList.filter((data)=>(data["status"] !== "resolved" && data["status"] !== "completed"))}/>
      </Tab>
      <Tab title="Maintainances">
      <OpenListView dataList={dataList.filter((data)=>(data["impact"] === "maintenance"))}/>
      </Tab>
    </Tabs>
  );
};
