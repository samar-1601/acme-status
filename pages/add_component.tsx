import React, { Component } from "react";

import styles from "../../components/ComponentCreation/styles.module.css"

import { ComponentCreationForm } from "../components/ComponentCreation/ComponentCreationForm";

class AddComponents extends React.Component {
  render() {
    return (
      <div className={styles.page}>
        <ComponentCreationForm />
      </div>
    );
  }
}

export default AddComponents;
