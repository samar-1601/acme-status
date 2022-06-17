import React from "react";
import { Header, NavigationBar } from "../../components/component/Component";
import styles from "../../components/component/styles.module.css"

class components extends React.Component {
  render() {
    return (
      <div className={styles.page}>
        <Header />
        <NavigationBar />
      </div>
    );
  }
}

export default components;
