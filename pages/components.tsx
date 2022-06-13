import { Block } from "baseui/block";
import React from "react";
import { Header } from "../components/components/header";
import { NavigationBar } from "../components/components/navigation_bar";

class components extends React.Component {
  render() {
    return (
      <Block overrides={{
        Block : {
          style : {
            paddingLeft: "25%",
            paddingRight: "25%"
          }
        }
      }}>
        <Header />
        <NavigationBar />
      </Block>
    );
  }
}

export default components;
