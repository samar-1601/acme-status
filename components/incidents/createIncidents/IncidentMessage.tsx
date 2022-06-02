import { FormControl } from "baseui/form-control";
import {Textarea} from 'baseui/textarea';
import {SIZE} from 'baseui/input';

export default function IncidentMessage(props){
    return(
        <FormControl label = {"Message"}>
            <Textarea  onChange = {(event) => {props.updateIncidentMessage(event)}} placeholder = {"We are currently investigating this issue."}/>
        </FormControl>
    );
}