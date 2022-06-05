import React from "react";
import { Header } from "../../components/components/header";
import { NavigationBar } from "../../components/components/navigation_bar";

class components extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NavigationBar />
      </div>
    );
  }
}

export default components;
