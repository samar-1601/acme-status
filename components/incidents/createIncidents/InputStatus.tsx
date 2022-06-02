import { FormControl} from "baseui/form-control"
// import { Input, SIZE } from "baseui/input"
import styles from "../../../styles/CreateIncident.module.css";
import {ProgressBar, SIZE} from 'baseui/progress-bar';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {BlockProps} from 'baseui/block';

function calculateStatus(status){
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

export default function InputStatus(props){
    const itemProps: BlockProps = {
        height: 'scale1000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        onClick: (event) => {props.updateStatus(event)}
      };
    return (
        <div className={styles.incidentStatus}>
            <FormControl label ={"Incident Status"}
            overrides={{}}>
                <>
                    <ProgressBar
                        value={calculateStatus(props.incidentStatus)}
                        //  getProgressLabel={}
                        //  showLabel
                        //  infinite
                        size={SIZE.large}
                        steps={undefined}
                        overrides ={{
                            Bar: {
                                style: ({$theme}) => ({
                                   margin: "0px 110px 0px 110px"
                                })
                            }
                        }}
                    />
                    <FlexGrid
                    flexGridColumnCount={4}
                    flexGridColumnGap="scale800"
                    flexGridRowGap="scale800"
                    >
                    <FlexGridItem {...itemProps}>Investigating</FlexGridItem>
                    <FlexGridItem {...itemProps}>Identified</FlexGridItem>
                    <FlexGridItem {...itemProps}>Monitoring</FlexGridItem>
                    <FlexGridItem {...itemProps}>Resolved</FlexGridItem>
                    </FlexGrid>
                </>
            </FormControl>
        </div>
    );
}