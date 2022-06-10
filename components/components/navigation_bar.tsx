import { useState } from "react";
import { Tabs, Tab } from "baseui/tabs-motion";
import styles from "./styles.module.css";

import ListView from "./list_view";
import { Button, SIZE } from "baseui/button";

export const NavigationBar = function () {
  const [activeKey, setActiveKey] = useState<number>(0);
  return (
    <div className={styles.navigationBar}>
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
    </div>
  );
};
