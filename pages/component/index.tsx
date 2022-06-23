import React from "react";
import { Header, NavigationBar } from "../../components/Component/Component";
import styles from "../../components/Component/styles.module.css"

class components extends React.Component {
  render() {
    return (
      <div className={styles.fullPage}>
        <div className={styles.page}>
          <Header />
          <NavigationBar />
        </div>
      </div>
    );
  }
}

export default components;
