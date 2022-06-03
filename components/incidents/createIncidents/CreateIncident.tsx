import { Button } from 'baseui/button';
import React, { useEffect, useState } from 'react';
import styles from "../../../styles/CreateIncident.module.css";
import {Spinner, SIZE} from 'baseui/spinner';
import InputStatus from './InputStatus';
import IncidentName from './IncidentName';
import IncidentMessage from './IncidentMessage';
import ComponentsAffected from './ComponentsAffected';
import {NEXT_PUBLIC_AUTH_TOKEN} from './../../../constants';
import { ComponentObject } from './ComponentsAffected';
import Router from 'next/router'

interface STATUSType {
    [key: string]: number
  }

interface SendComponentObject{
    [key: string]: string
}

const  STATUS:STATUSType = {
    "operational" : 1,
    "degraded_performance": 2,
    "partial_outage": 3,
    "major_outage": 4,
    "under_maintenance": 5,
}

const getStatus = (id:number) => {
    switch(id){
        case 1: return "operational";
        case 2: return "degraded_performance"
        case 3: return "partial_outage"
        case 4: return "major_outage"
        case 5: return "under_maintenance"
       
    }
}

const getIncidentStatus = (id:String) => {
    switch(id){
        case "Investigating" : return "scheduled"
        case "Identified" : return "in_progress"
        case "Monitoring" : return "verifying"
        case "Resolved" : return "completed"
    }
}

interface JSONObject{
    name:String,
    id:String,
    status: string
}

interface optionType{
    option: {
        id: Number;
    }
}

let InitialData:(ComponentObject|never)[] = [];

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
                console.log(json);
                InitialData = json.map((item:JSONObject, index:Number) => {
                    return({
                        compName: item.name,
                        compType: STATUS[item.status],
                        id: index,
                        compId: item.id,
                        selected: false
                    });
                })
                setComponentsAffected(InitialData);
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

    const getDateTime = () => {
        const today = new Date();
        return today.toISOString();

    }

    const submitForm = () => {
        console.log(isLoaded);
        console.log(incidentName);
        console.log(incidentMessage);
        console.log(incidentStatus);
        console.log(componentsAffected);
        const componentIDs = componentsAffected.filter(function(item){
            if(!item.selected){
                return false;
            }
            return true;
        }).map(function(item){
            return item.compId;
        })
        let components:(SendComponentObject) = {};
        componentsAffected.forEach((item) => {
            if(item.selected && item.compType != InitialData[Number(item.id)].compType){
                const key = item.compId;
                // Object.assign(components,{ key : getStatus(item.compType}))
                // components = {...components, key: getStatus(item.compType)!}
                components[key] = getStatus(item.compType)!;
            }
        });
        const submit = {
            "incident": {
              "name": incidentName,
              "status": getIncidentStatus(incidentStatus),
              "impact_override": "none",
              "scheduled_for": getDateTime(),
              "scheduled_until": "2022-06-12T06:00:00.007Z",
              "scheduled_remind_prior": true,
              "scheduled_auto_in_progress": true,
              "scheduled_auto_completed": true,
              "metadata": {},
              "deliver_notifications": true,
              "auto_transition_deliver_notifications_at_end": true,
              "auto_transition_deliver_notifications_at_start": true,
              "auto_transition_to_maintenance_state": true,
              "auto_transition_to_operational_state": true,
              "backfill_date": "string",
              "backfilled": false,
              "body": "string",
              "components": components,
              "component_ids": componentIDs,
              "scheduled_auto_transition": true
            }
          }
        console.log(submit);
        console.log(props.pageID[0]);
        fetch("https://api.statuspage.io/v1/pages/" + props.pageID[0] + "/incidents", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
            },
            body: JSON.stringify(submit),
        })
        .then(response => response.json())
        .then((json) => console.log(json))
        .then(() => {Router.push('/')})
    }

    const toggleCheckBox = (e:React.BaseSyntheticEvent) =>{
        const newComponentsAffected =  componentsAffected.map((item:ComponentObject) => {
            if(item.id == e.target.name){
                return {
                    compName: item.compName,
                    compType: item.compType,
                    id: item.id,
                    compId: item.compId,
                    selected: !item.selected
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
                    compId: item.compId,
                    selected: item.selected
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
            {isLoaded == true ? <><ComponentsAffected componentList = {componentsAffected} toggleCheckBox = {(e:React.BaseSyntheticEvent) => toggleCheckBox(e)} changeOption ={(e:optionType, id:String) => changeOption(e, id)}/> <Button onClick={() => {submitForm()}} overrides={{BaseButton : {style: ({$theme}) => ({backgroundColor: $theme.colors.accent,width: '80px',alignSelf: 'end'})}}}>Create</Button></> : <div className={styles.Spinner}><Spinner $size={SIZE.large} /></div> }
            </div></>
    );
    
   
}