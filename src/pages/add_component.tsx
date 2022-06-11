import React, { Component } from "react";

import styles from "../../components/add_component/styles.module.css"

import { Description, Form } from "../../components/add_component/form";
import { Header } from "../../components/add_component/header";
import { Uptime } from "../../components/add_component/uptime_bar";
import { ComponentGroup } from "../../components/add_component/component_group";

class AddComponents extends React.Component {
  render() {
    return (
      <div className={styles.page}>
        <Header />
        <Form />
        <Description />
        <ComponentGroup />
        <Uptime />
      </div>
    );
  }
}

export default AddComponents;
