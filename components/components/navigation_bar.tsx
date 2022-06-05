import { useState } from "react";
import { Tabs, Tab } from "baseui/tabs-motion";
import styles from "./styles.module.css";
import { styled } from "styletron-react";

import ListView from "./list_view";

export const NavigationBar = function () {
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
      <Tab title="Active">
        <ListView />
      </Tab>
      <Tab title="Third-party" disabled></Tab>
    </Tabs>
  );
};
