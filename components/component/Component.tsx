import * as React from "react"
import Router from "next/router";

import styles from "./styles.module.css";
import { Tabs, Tab } from "baseui/tabs-motion";
import { Block, BlockProps } from "baseui/block";

import { ComponentList } from "./ComponentList";
import { createTheme, lightThemePrimitives, ThemeProvider } from "baseui";
import { header, headerBarBackIcon, heading } from "./componentStyles";
import Link from "next/link";



export const Header = function () {
  return (
    <Block {...header}>    
      <Block {...heading}>
        <Link href="/">
          <Block {...headerBarBackIcon} className="material-symbols-outlined"
            overrides={{
              Block: {
                style : {
                  paddingTop: "7px",
                  paddingRight: "8px",
                  cursor: "pointer",
                }
              }
            }}
          >
            arrow_back
          </Block>
        </Link>
        <Block overrides={{
          Block: {
            style: {
              marginLeft: "5px"
            }
          }
        }}>Components</Block>
      </Block>
      <Block 
        overrides ={{
          Block : {
            style : {
              backgroundColor: "blue",
              alignSelf: "right",
              fontSize: "14px",
              padding: "0 12px",
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
