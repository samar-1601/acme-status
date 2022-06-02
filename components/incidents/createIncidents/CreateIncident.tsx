import { Button } from 'baseui/button';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import { useEffect, useState } from 'react';
import styles from "../../../styles/CreateIncident.module.css";
import {Spinner, SIZE} from 'baseui/spinner';
import InputStatus from './InputStatus';
import IncidentName from './IncidentName';
import IncidentMessage from './IncidentMessage';
import ComponentsAffected from './ComponentsAffected';
import { ITEMS } from './StatusComponent';
import {NEXT_PUBLIC_AUTH_TOKEN} from './../../../constants';

//NOTE : id used in component is not the actual id of the component. Instead use compId for the same.

export default function CreateIncident ({pageID}) {

   
    const [isLoaded, setIsLoaded] = useState(false);
    const [incidentName , setIncidentName] = useState('');
    const [incidentStatus, setIncidentStatus] = useState("Investigating");
    const [incidentMessage, setIncidentMessage] = useState('');
    const [componentsAffected, setComponentsAffected] = useState([]);
    const tempData = ["API", "Website", "Mangement Portral"];

    useEffect(() => {
        console.log("HI HI HI")
        console.log(pageID)
        pageID.forEach((page) => {
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
                const njson = json.map((item, index) => {
                    return({
                        compName: item.name,
                        compType: 0,
                        id: index,
                        compId: item.id
                    });
                })
                setComponentsAffected(njson);
                console.log("Here I am",componentsAffected);
                setIsLoaded(true);
                // const npageID = json.map(item => {
                //     return item.id;
                // })
                // setPageID(pageID);
            })
            .catch(error => console.log(error));
        });
    }, [pageID])

    useEffect(() => {
        console.log(isLoaded);
        console.log(incidentName);
        console.log(incidentMessage);
        console.log(incidentStatus);
        console.log(componentsAffected);
    })

    // const obj = tempData.map((item, index) => {
    //     return {
    //         compName: item,
    //         compType: 0,
    //         id: index
    //     }

    // });
    
    
    
    const handleNameChange = (e) => {
        setIncidentName(e.target.value);
    }

    const updateIncidentMessage = (e) =>{
        setIncidentMessage(e.target.value);
        // console.log(incidentMessage);
    }

    const toggleCheckBox = (e) =>{
        // console.log(e);
        // console.log(e.target);
        // console.log(e.target.name);
        const newComponentsAffected =  componentsAffected.map((item) => {
            console.log(item.id, e.target.name);
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
        // console.log(e);
        setIncidentStatus(e.target.innerHTML);
    }

    return (
        <>
        <div className = {styles.main}>
            <h2>Create Incident</h2>
            <IncidentName value = {incidentName} handleNameChange = {(e) => handleNameChange(e)}/>
            <InputStatus updateStatus = {(e) => updateStatus(e)} incidentStatus = {incidentStatus}/>
            <IncidentMessage value = {incidentMessage} updateIncidentMessage = {(e) => updateIncidentMessage(e)}/>
            {isLoaded == true ? <><ComponentsAffected componentList = {componentsAffected} toggleCheckBox = {(e) => toggleCheckBox(e)} changeOption ={(e, id) => changeOption(e, id)}/> <Button overrides={{BaseButton : {style: ({$theme}) => ({backgroundColor: $theme.colors.accent,width: '80px',borderRadius: "5%",alignSelf: 'end'})}}}>Create</Button></> : <div className={styles.Spinner}><Spinner $size={SIZE.large} /></div> }
            </div></>
    );
    
   
}