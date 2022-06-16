import * as React from "react"

import styles from "./styles.module.css";
import { Tabs, Tab } from "baseui/tabs-motion";
import { Button, SIZE } from "baseui/button";

import { ComponentList } from "./ComponentList";
import Router from "next/router";

export const Header = function () {
  return (
    <div className={styles.header}>
      <div className={styles.heading}>Components</div>
      <div>
        <Button 
          size={SIZE.compact}
          overrides ={{
            BaseButton : {
              style : {
                backgroundColor: "blue",
                alignSelf: "right",
                justifyContent: "right",
              },
              props : {
                className: "add-button"
              }
            }
          }}
          onClick = {() => Router.push("/add_component")}  
          >Add Component
        </Button>
      </div>
    </div>
  )
};

export const NavigationBar = function () {
  const [activeKey, setActiveKey] = React.useState<number>(0);
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
          <ComponentList />
        </Tab>
        <Tab title="Third-party" disabled></Tab>
      </Tabs>
    </div>
  );
};
