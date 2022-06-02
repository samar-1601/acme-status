import { FlexGrid } from "baseui/flex-grid";
import { FormControl } from "baseui/form-control";
import {Input, SIZE, ADJOINED} from 'baseui/input';
import styles from "../../../styles/CreateIncident.module.css";
import StatusComponent from "./StatusComponent";
import SelectStatusComponent from "./SelectStatusComponent";


const label = <div className={styles.componentLabel}>Components Affected</div>

export default function ComponentsAffected(props){
    return(
        <FormControl
          label={label}
          positive={undefined}
          error={undefined}
          overrides ={
            {
              ControlContainer : {
                style:({$theme}) => ({
                  borderStyle: 'solid none',
                  borderColor: $theme.colors.borderOpaque
                })
              }
            }
          }>
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