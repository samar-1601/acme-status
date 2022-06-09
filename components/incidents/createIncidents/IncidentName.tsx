import { FormControl} from "baseui/form-control"
import { Input, SIZE } from "baseui/input"

interface IncidentNameProps{
    handleNameChange: Function,
    value: string
}

export default function IncidentName(props:IncidentNameProps){
    return (
        <FormControl label={ "Incident Name"} caption={"This incident will be posted to page Acme"}>
            <Input onChange={(event) => {props.handleNameChange(event)}} value = {props.value} placeholder = {"Incident Name"}/>
        </FormControl>
    );
}