import styles from "../../../styles/CreateIncident.module.css";
import {Checkbox, STYLE_TYPE, LABEL_PLACEMENT} from 'baseui/checkbox';
import {ChevronDown} from 'baseui/icon';
import {StatefulPopover, PLACEMENT} from 'baseui/popover';
import {StatefulMenu, OptionProfile} from 'baseui/menu';
import {Button, KIND, SIZE, SHAPE} from 'baseui/button';
import {Avatar} from 'baseui/avatar';


export const ITEMS = [
    {title: 'Operational', imgUrl: '/operational2.webp', id: '0'},
    {title: 'Degraded Performance', imgUrl: '/degraded_performance.png', id: '1'},
    {title: 'Partial Outage', imgUrl: '/paritial_outage.png', id: '2'},
    {title: 'Major Outage', imgUrl: '/major_outage.png', id: '3'},
    {title: 'Under Maintainence', imgUrl: '/under_maintenance.png', id: '4'},
  ];

export default function StatusComponent(props){
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
            <StatefulPopover
                placement={PLACEMENT.bottomLeft}
                content={({close}) => (
                    <StatefulMenu
                    onItemSelect={(event) => {props.changeOption(event, props.id);}}
                    items={ITEMS}
                    overrides={{
                      List: {
                        style: {
                          width: '300px',
                        },
                        // ProfileImg:
                      },
                      Option: {
                        component: OptionProfile,
                        props: {
                          getProfileItemLabels: ({
                            title,
                            id
                          }) => ({
                            title,
                            id
                            
                          }),
                          getProfileItemImg: (item) => item.imgUrl,
                          getProfileItemImgText: (item) => item.title,
                          overrides: {
                            ProfileImg: {
                              style: {
                                height: "50%",
                                width: "50%"
                              },
                              ListItemProfile: {
                                height: "30px"
                              }
                            }
                          }
                        },
                      },
                    }}
                  />
                )}
                >
                <Button
                overrides={{
                  BaseButton: {
                    style: {
                      width: "300px",
                      justifyContent: "left"
                      
                    }
                  }
                }}
                kind={KIND.secondary}>
                    <Avatar
                      overrides={{
                        Root: {
                          style: {
                            margin: "0 10px 0 0"
                          }
                        }
                      }}
                      name={ITEMS[props.selected - 1].title}
                      size="scale800"
                      src={ITEMS[props.selected - 1].imgUrl}
                    />
                        {ITEMS[props.selected - 1].title}
                </Button>
                </StatefulPopover>
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
            <StatefulPopover 
                placement={PLACEMENT.bottomLeft}
                content={({close}) => (
                    <StatefulMenu
                    onItemSelect={(event) => {props.changeOption(event, props.id);}}
                    items={ITEMS}
                    overrides={{
                      List: {
                        style: {
                          width: '300px',
                        },
                        // ProfileImg:
                      },
                      Option: {
                        component: OptionProfile,
                        props: {
                          getProfileItemLabels: ({
                            title,
                            id
                          }) => ({
                            title,
                            id
                            
                          }),
                          getProfileItemImg: (item) => item.imgUrl,
                          getProfileItemImgText: (item) => item.title,
                          overrides: {
                            ProfileImg: {
                              style: {
                                height: "50%",
                                width: "50%"
                              },
                              ListItemProfile: {
                                height: "30px"
                              }
                            }
                          }
                        },
                      },
                    }}
                  />
                )}
                >
                <Button
                overrides={{
                  BaseButton: {
                    style: {
                      width: "300px",
                      justifyContent: "left"
                      
                    }
                  }
                }}
                kind={KIND.secondary}>
                    <Avatar
                      overrides={{
                        Root: {
                          style: {
                            margin: "0 10px 0 0"
                          }
                        }
                      }}
                      name={ITEMS[0].title}
                      size="scale800"
                      src={ITEMS[0].imgUrl}
                    />
                        {ITEMS[0].title}
                </Button>
                </StatefulPopover>
            </div>
            </div>
        );
    }
}