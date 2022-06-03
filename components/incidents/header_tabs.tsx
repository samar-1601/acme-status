import { useState } from "react";
import { Tabs, Tab } from "baseui/tabs-motion";
import { OpenListView } from "./open_list_view";

export const HeaderTabs: React.FC = () => {
  const [activeKey, setActiveKey] = useState<number>(0);

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
        <OpenListView pageType="All"/>
      </Tab>
      <Tab title="Active">
        <OpenListView pageType="Active"/>
      </Tab>
      <Tab title="Maintainances">
        <OpenListView pageType="Maintainances"/>
      </Tab>
    </Tabs>
  );
};
