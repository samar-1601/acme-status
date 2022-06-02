import styles from "../../../styles/CreateIncident.module.css";
import {Checkbox, STYLE_TYPE, LABEL_PLACEMENT} from 'baseui/checkbox';
import React from "react";
import {Select, SIZE, TYPE} from 'baseui/select';


export const ITEMS = [
    {title: 'Operational', imgUrl: '/operational2.webp', id: '0'},
    {title: 'Degraded Performance', imgUrl: '/degraded_performance.png', id: '1'},
    {title: 'Partial Outage', imgUrl: '/paritial_outage.png', id: '2'},
    {title: 'Major Outage', imgUrl: '/major_outage.png', id: '3'},
    {title: 'Under Maintainence', imgUrl: '/under_maintenance.png', id: '4'},
  ];

interface ImageProps{
    imgUrl: string,
    title: string
}

interface statusComponentProps{
    selected: number,
    id: string,
    toggleCheckBox: Function,
    name: string,
    changeOption: Function
}

function Image(props:ImageProps){
    // return(<div><Avatar
    //     overrides={{
    //         Root: {
    //             style: {
    //             margin: "0  10px 0 0"
    //             }
    //         }
    //         }}
    //         name={props.title}
    //         size="scale800"
    //         src={props.imgUrl}
    //     /> {props.title}</div>);
    return(<div className={styles.option}><img className={styles.icon}
            src={props.imgUrl}
        /> <div>{props.title}</div></div>);
}
export default function SelectStatusComponent(props:statusComponentProps) {

    const options = ITEMS.map((item, idx) => {
        return {
            label: <Image title = {item.title} imgUrl = {item.imgUrl}/>,
            id: idx
        }
    })
    if(props.selected != 0){
        return (
        <div className={styles.statusComponent} id = {props.id}>
            <Checkbox
                    labelPlacement={LABEL_PLACEMENT.right}
                    checked = {true}
                    onChange = {(event) => {props.toggleCheckBox(event)}}
                    name = {props.id}
                    overrides = {{
                        Root:{
                        style:{
                            paddingTop: "15px"
                        }
                        },
                        Checkmark: {
                            style: ({ $checked, $theme }) => ({
                            borderLeftColor: "blue",
                            borderRightColor: "blue",
                            borderTopColor: "blue",
                            borderBottomColor: "blue",
                            backgroundColor: $checked ? "blue" : null
                            })
                        }
                    }}>
                    {props.name}
                </Checkbox>
        <Select
            options={options}
            backspaceRemoves = {false}
            clearable ={false}
            searchable ={false}
            value={[options[props.selected - 1]]}
            placeholder="Select color"
            onChange={(event) => {props.changeOption(event, props.id);}}
            overrides={{
            DropdownOption: {
                style: ({ $theme }) => ({
                outline: `${$theme.colors.warning200} solid`,
                backgroundColor: $theme.colors.warning200
                })
            },
            Root:{
                style:{
                    width: '300px'
                    }
            }
            }}
        />
        </div>
        );
    }
    else{
        return (
            <div className={styles.statusComponent} id = {props.id}>
                <Checkbox
                        labelPlacement={LABEL_PLACEMENT.right}
                        checked = {false}
                        onChange = {(event) => {props.toggleCheckBox(event)}}
                        name = {props.id}
                        overrides = {{
                            Root:{
                            style:{
                                paddingTop: "15px"
                            }
                            },
                            Checkmark: {
                                style: ({ $checked, $theme }) => ({
                                borderLeftColor: "blue",
                                borderRightColor: "blue",
                                borderTopColor: "blue",
                                borderBottomColor: "blue",
                                backgroundColor: $checked ? "blue" : null
                                })
                            }
                        }}>
                        {props.name}
                    </Checkbox>
            <div className={styles.hiddenElement}>
            <Select
                options={options}
                backspaceRemoves = {false}
                clearable ={false}
                searchable ={false}
                value={[options[0]]}
                placeholder="Select color"
                onChange={(event) => {props.changeOption(event, props.id);}}
                overrides={{
                DropdownOption: {
                    style: ({ $theme }) => ({
                    outline: `${$theme.colors.warning200} solid`,
                    backgroundColor: $theme.colors.warning200
                    })
                },
                Root:{
                    style:{
                        width: '300px'
                        }
                }
                }}
            />
            </div>
            </div>
            );
    }
  }