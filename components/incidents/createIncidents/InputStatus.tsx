import { FormControl} from "baseui/form-control"
import styles from "../../../styles/CreateIncident.module.css";
import {ProgressBar, SIZE} from 'baseui/progress-bar';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {BlockProps} from 'baseui/block';

const STATUS = [
    "Investigating",
    "Identified",
    "Monitoring",
    "Resolved"
]

function calculateStatus(status:String){
    if(status == "Investigating"){
        return 0
    }
    if(status == "Identified"){
        return 33
    }
    if(status == "Monitoring"){
        return 66
    }
    else{
        return 100
    }
}

interface InputStatusprops {
    updateStatus: Function,
    incidentStatus: String
}

export default function InputStatus(props : InputStatusprops){
    const itemProps: BlockProps = {
        height: 'scale1000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        onClick: (event) => {props.updateStatus(event)},
        overrides: {
           Block :{
               style:{
                   cursor: "pointer"
               }
           }
        }
      };
      const selectedItemProps: BlockProps = {
        height: 'scale1000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'blue',
        onClick: (event) => {props.updateStatus(event)}
      };
      
      const flexItems = STATUS.map((item, index) => {
          if(item != props.incidentStatus){
            return  <FlexGridItem key={index} {...itemProps}>{item}</FlexGridItem>
          }
          else{
              return <FlexGridItem key={index} {...selectedItemProps}>{item}</FlexGridItem>
          }
      })
    return (
        <div className={styles.incidentStatus}>
            <FormControl label ={"Incident Status"}
            overrides={{
                ControlContainer:{
                        style:({$theme}) =>( {
                            backgroundColor: $theme.colors.backgroundTertiary
                        }
                    )
                }
            }}>
                <>
                    <ProgressBar
                        value={calculateStatus(props.incidentStatus)}
                        size={SIZE.large}
                        steps={undefined}
                        overrides ={{
                            Bar: {
                                style: ({$theme}) => ({
                                    
                                   margin: "25px 110px 0px 110px"
                                })
                            }
                        }}
                    />
                    <FlexGrid
                    flexGridColumnCount={4}
                    flexGridColumnGap="scale800"
                    flexGridRowGap="scale800"
                    >
                    {flexItems}
                    </FlexGrid>
                </>
            </FormControl>
        </div>
    );
}