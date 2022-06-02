import { Button } from 'baseui/button';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import { useState } from 'react';
import styles from "../../../styles/CreateIncident.module.css";
import {Slider} from 'baseui/slider';
import InputStatus from './InputStatus';
import IncidentName from './IncidentName';
import IncidentMessage from './IncidentMessage';
import ComponentsAffected from './ComponentsAffected';
import { ITEMS } from './StatusComponent';


export default function CreateIncident () {

    const tempData = ["API", "Website", "Mangement Portral"];
    const obj = tempData.map((item, index) => {
        return {
            compName: item,
            compType: 0,
            id: index
        }

    });
    console.log(obj);
    const [incidentName , setIncidentName] = useState('');
    const [incidentStatus, setIncidentStatus] = useState("Investigating");
    const [incidentMessage, setIncidentMessage] = useState('');
    const [componentsAffected, setComponentsAffected] = useState(obj);
    
    
    const handleNameChange = (e) => {
        setIncidentName(e.target.value);
    }

    const updateIncidentMessage = (e) =>{
        setIncidentMessage(e.target.value);
        console.log(incidentMessage);
    }

    const toggleCheckBox = (e) =>{
        console.log(e);
        console.log(e.target);
        console.log(e.target.name);
        const newComponentsAffected =  componentsAffected.map((item) => {
            console.log(item.id, e.target.name);
            if(item.id == e.target.name){
                return {
                    compName: item.compName,
                    compType: (item.compType == 0 ? 1 : 0),
                    id: item.id
                }
            }
            else{
                return item;
            }
        });
        console.log("Here it is ", newComponentsAffected);
        setComponentsAffected(
           newComponentsAffected
        );
        console.log("here is components affected",componentsAffected);
    }

    const changeOption = (e, id) =>{
        console.log(e,id);
        const newComponentsAffected =  componentsAffected.map((item) => {
            console.log(item.id, id);
            if(item.id == id){
                return {
                    compName: item.compName,
                    compType: Number(e.option.id) + 1,
                    id: item.id
                }
            }
            else{
                return item;
            }
        });
        console.log("Here it is ", newComponentsAffected);
        setComponentsAffected(
           newComponentsAffected
        );
    }

    const updateStatus =(e) =>{
        console.log(e);
        setIncidentStatus(e.target.innerHTML);
    }

    return (
        <>
        <div className = {styles.main}>
            <h2>Create Incident</h2>
            <IncidentName value = {incidentName} handleNameChange = {(e) => handleNameChange(e)}/>
            <InputStatus updateStatus = {(e) => updateStatus(e)} incidentStatus = {incidentStatus}/>
            <IncidentMessage value = {incidentMessage} updateIncidentMessage = {(e) => updateIncidentMessage(e)}/>
            <ComponentsAffected componentList = {componentsAffected} toggleCheckBox = {(e) => toggleCheckBox(e)} changeOption ={(e, id) => changeOption(e, id)}/>
            <Button overrides={
                {
                    BaseButton : {
                        style: ({$theme}) => ({
                            backgroundColor: $theme.colors.accent,
                            width: '80px',
                            borderRadius: "5%",
                            alignSelf: 'end'
                        })
                    }
                }
            }>Create</Button>
        </div>
        </>
    );
    
   
}