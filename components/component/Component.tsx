import * as React from "react"
import Router from "next/router";

import styles from "./styles.module.css";
import { Tabs, Tab } from "baseui/tabs-motion";
import { Button, SIZE } from "baseui/button";
import { Block, BlockProps } from "baseui/block";
import { Avatar } from "baseui/avatar";

import { ComponentList } from "./ComponentList";
import { createTheme, lightThemePrimitives, ThemeProvider } from "baseui";

const headerBarBackIcon: BlockProps = {
  onClick: () => {
    Router.push("/");
  },
  overrides: {
    Block: {
      style: {
        marginRight: "15px",
        cursor: "pointer",
      },
    },
  },
};

export const Header = function () {
  return (
    <div className={styles.header}>    
      <div className={styles.heading}>        
        <div>
          <Block {...headerBarBackIcon}>
          <Avatar
            name="Back"
            size="scale900"
            src="https://img.icons8.com/flat-round/64/undefined/back--v1.png"
          />
          </Block>
        </div>
        <div>Components</div>
      </div>
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
        onClick = {() => Router.push("/component/new")}  
        >Add Component
      </Button>
    </div>
  )
};

export const NavigationBar = function () {
  const [activeKey, setActiveKey] = React.useState<number>(0);
  return (
    <div className={styles.navigationBar}>
      <ThemeProvider
        theme={createTheme(lightThemePrimitives, {
          colors: { backgroundPrimary: "#F8F8FA" }
        })}
      >
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
          TabList: {
            style: () => ({
              backgroundColor: "#F8F8FA",
            })
          }
        }}
      >
        <Tab title="Active">
          <ComponentList />
        </Tab>
        <Tab title="Third-party" disabled></Tab>
      </Tabs>
      </ThemeProvider>
    </div>
  );
};
