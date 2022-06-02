import { FlexGrid } from "baseui/flex-grid";
import { FormControl } from "baseui/form-control";
import {Input, SIZE, ADJOINED} from 'baseui/input';
import styles from "../../../styles/CreateIncident.module.css";
import StatusComponent from "./StatusComponent";
import SelectStatusComponent from "./SelectStatusComponent";

export default function ComponentsAffected(props){
    return(
        <FormControl
          label={"Components Affected"}
          positive={undefined}
          error={undefined}>
        <div className={styles.components}
        >
          {props.componentList.map((item) => {
              return (
                  <SelectStatusComponent key = {item.id} name = {item.compName} id ={item.id} selected = {item.compType} toggleCheckBox = {(event) => props.toggleCheckBox(event)} changeOption = {(event, compId) => props.changeOption(event, compId)}/>
              );
          })}
          </div>
        </FormControl>
    );
}