import * as React from "react"
import Router from "next/router";

import styles from "./styles.module.css";
import { Tabs, Tab } from "baseui/tabs-motion";
import { Button, SIZE } from "baseui/button";
import { Block, BlockProps } from "baseui/block";
import { Avatar } from "baseui/avatar";

import { ComponentList } from "./ComponentList";
import { createTheme, lightThemePrimitives, ThemeProvider } from "baseui";
import { header, headerBarBackIcon, heading } from "./componentStyles";



export const Header = function () {
  return (
    <Block {...header}>    
      <Block {...heading}>        
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
      </Block>
      <Block 
        overrides ={{
          Block : {
            style : {
              backgroundColor: "blue",
              alignSelf: "right",
              justifyContent: "right",
              fontSize: "14px",
              padding: "0 12px"
            },
            props : {
              className: "primary-button"
            }
          }
        }}
        onClick = {() => Router.push("/component/new")}  
        >Add Component
      </Block>
    </Block>
  );
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
