import styles from "../../../styles/CreateIncident.module.css";
import {Checkbox, STYLE_TYPE, LABEL_PLACEMENT} from 'baseui/checkbox';
import React from "react";
import {Select, SIZE, TYPE} from 'baseui/select';
import {StatefulPopover, TRIGGER_TYPE} from 'baseui/popover';
import {ParagraphSmall} from 'baseui/typography';
import {useStyletron} from 'baseui';


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
    selected: boolean,
    id: string,
    toggleCheckBox: Function,
    name: string,
    changeOption: Function,
    type: number
}

function Image(props:ImageProps){
    return(<div className={styles.option}><img className={styles.icon}
            src={props.imgUrl}
        /> <div>{props.title}</div></div>);
}
export default function SelectStatusComponent(props:statusComponentProps) {
    const [css, theme] = useStyletron();

    const options = ITEMS.map((item, idx) => {
        return {
            label: <Image title = {item.title} imgUrl = {item.imgUrl}/>,
            id: idx
        }
    })
    if(!props.selected){
        return (
        <div className={styles.statusComponent} id = {props.id}>
            <Checkbox
                    labelPlacement={LABEL_PLACEMENT.right}
                    checked = {props.selected}
                    onChange = {(event) => {props.toggleCheckBox(event)}}
                    name = {props.id}
                    overrides = {{
                        Root:{
                        style:{
                            paddingTop: "15px"
                        }
                        },
                        Checkmark: {
                            style: ({ $checked}) => ({
                            borderLeftColor: "blue",
                            borderRightColor: "blue",
                            borderTopColor: "blue",
                            borderBottomColor: "blue",
                            backgroundColor: $checked ? "blue" : "white"
                            })
                        }
                    }}>
                    {props.name}
                </Checkbox>
            
            
            
            <StatefulPopover
            content={
                <ParagraphSmall padding="scale500">
                    Select Component to enable options
                </ParagraphSmall>
            }
            accessibilityType={'tooltip'}
            triggerType={TRIGGER_TYPE.hover}
            >
            <span className={css({...theme.typography.font300})}>
                <Select
                    options={options}
                    disabled ={!props.selected}
                    backspaceRemoves = {false}
                    clearable ={false}
                    searchable ={false}
                    value={[options[props.type - 1]]}
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
            </span>
            </StatefulPopover>
        </div>
        );
    }
    else{
        return (
            <div className={styles.statusComponent} id = {props.id}>
                <Checkbox
                        labelPlacement={LABEL_PLACEMENT.right}
                        checked = {props.selected}
                        onChange = {(event) => {props.toggleCheckBox(event)}}
                        name = {props.id}
                        overrides = {{
                            Root:{
                            style:{
                                paddingTop: "15px"
                            }
                            },
                            Checkmark: {
                                style: ({ $checked}) => ({
                                borderLeftColor: "blue",
                                borderRightColor: "blue",
                                borderTopColor: "blue",
                                borderBottomColor: "blue",
                                backgroundColor: $checked ? "blue" : "white"
                                })
                            }
                        }}>
                        {props.name}
                    </Checkbox>
                    <Select
                        options={options}
                        disabled ={!props.selected}
                        backspaceRemoves = {false}
                        clearable ={false}
                        searchable ={false}
                        value={[options[props.type - 1]]}
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
  }