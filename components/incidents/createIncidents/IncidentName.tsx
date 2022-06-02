import { FormControl} from "baseui/form-control"
import { Input, SIZE } from "baseui/input"
import { Slider } from "baseui/slider";
import styles from "../../../styles/CreateIncident.module.css";

export default function IncidentName(props){
    return (
        <FormControl label={ "Incident Name"} caption={"This incident will be posted to page Acme"}>
            <Input onChange={(event) => {props.handleNameChange(event)}} value = {props.value} placeholder = {"Incident Name"}/>
        </FormControl>
    );
}