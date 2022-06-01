import { useState } from "react";
import { Tabs, Tab } from "baseui/tabs-motion";
import { OpenListView } from "./open_list_view";

export const HeaderTabs = () => {
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
            backgroundColor: '#DCDCDC'
          })
        },
        TabHighlight: {
          style: () => ({
            backgroundColor: 'blue'
          })
        },

      }}
    >
      <Tab title="Open" ><OpenListView/></Tab>
      <Tab title="Incidents" disabled>Incidents</Tab>
      <Tab title="Maintainances" disabled>Maintainances</Tab>
    </Tabs>
  );
}