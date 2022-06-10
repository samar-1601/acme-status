import { Button, SIZE } from "baseui/button";
import * as React from "react";
import styles from "./styles.module.css";


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
          >Add Component
        </Button>
      </div>
    </div>
  )
};
