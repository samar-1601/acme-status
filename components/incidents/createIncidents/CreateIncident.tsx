import { Button } from 'baseui/button';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import React, { useEffect, useState } from 'react';
import styles from "../../../styles/CreateIncident.module.css";
import {Spinner, SIZE} from 'baseui/spinner';
import InputStatus from './InputStatus';
import IncidentName from './IncidentName';
import IncidentMessage from './IncidentMessage';
import ComponentsAffected from './ComponentsAffected';
import {NEXT_PUBLIC_AUTH_TOKEN} from './../../../constants';
import { ComponentObject } from './ComponentsAffected';

interface JSONObject{
    name:String,
    id:String
}

interface optionType{
    option: {
        id: Number;
    }
}

//NOTE : id used in component is not the actual id of the component. Instead use compId for the same.

interface CreateIncidentProps{
    pageID: String[]
}

export default function CreateIncident (props:CreateIncidentProps) {

   
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [incidentName , setIncidentName] = useState<string>('');
    const [incidentStatus, setIncidentStatus] = useState<String>("Investigating");
    const [incidentMessage, setIncidentMessage] = useState<String>('');
    const [componentsAffected, setComponentsAffected] = useState<ComponentObject[]>([]);
    const tempData = ["API", "Website", "Mangement Portral"];

    useEffect(() => {
        const pageID = props.pageID;
        pageID.forEach((page:String) => {
            const URL = `https://api.statuspage.io/v1/pages/${page}/components`;
            fetch(URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
                },
            })
            .then(response => response.json())
            .then(json => {
                const njson = json.map((item:JSONObject, index:Number) => {
                    return({
                        compName: item.name,
                        compType: 0,
                        id: index,
                        compId: item.id
                    });
                })
                setComponentsAffected(njson);
                setIsLoaded(true);
            })
            .catch(error => console.log(error));
        });
    }, [props.pageID])

    // useEffect(() => {
    //     console.log(isLoaded);
    //     console.log(incidentName);
    //     console.log(incidentMessage);
    //     console.log(incidentStatus);
    //     console.log(componentsAffected);
    // })
    const handleNameChange = (e:React.BaseSyntheticEvent) => {
        setIncidentName(e.target.value);
    }

    const updateIncidentMessage = (e:React.BaseSyntheticEvent) =>{
        setIncidentMessage(e.target.value);
    }

    const toggleCheckBox = (e:React.BaseSyntheticEvent) =>{
        const newComponentsAffected =  componentsAffected.map((item:ComponentObject) => {
            if(item.id == e.target.name){
                return {
                    compName: item.compName,
                    compType: (item.compType == 0 ? 1 : 0),
                    id: item.id,
                    compId: item.compId
                }
            }
            else{
                return item;
            }
        });
        setComponentsAffected(
           newComponentsAffected
        );
    }

    const changeOption = (e:optionType, id:String) =>{
        const newComponentsAffected =  componentsAffected.map((item:ComponentObject) => {
            if(item.id.toString() == (id)){
                return {
                    compName: item.compName,
                    compType: Number(e.option.id) + 1,
                    id: item.id,
                    compId: item.compId
                }
            }
            else{
                return item;
            }
        });
        setComponentsAffected(
           newComponentsAffected
        );
    }

    const updateStatus =(e:React.BaseSyntheticEvent) =>{
        setIncidentStatus(e.target.innerHTML);
    }

    return (
        <>
        <div className = {styles.main}>
            <h2>Create Incident</h2>
            <IncidentName value = {incidentName} handleNameChange = {(e:React.BaseSyntheticEvent) => handleNameChange(e)}/>
            <InputStatus updateStatus = {(e:React.BaseSyntheticEvent) => updateStatus(e)} incidentStatus = {incidentStatus}/>
            <IncidentMessage value = {incidentMessage} updateIncidentMessage = {(e:React.BaseSyntheticEvent) => updateIncidentMessage(e)}/>
            {isLoaded == true ? <><ComponentsAffected componentList = {componentsAffected} toggleCheckBox = {(e:React.BaseSyntheticEvent) => toggleCheckBox(e)} changeOption ={(e:optionType, id:String) => changeOption(e, id)}/> <Button overrides={{BaseButton : {style: ({$theme}) => ({backgroundColor: $theme.colors.accent,width: '80px',alignSelf: 'end'})}}}>Create</Button></> : <div className={styles.Spinner}><Spinner $size={SIZE.large} /></div> }
            </div></>
    );
    
   
}