import { Block } from "baseui/block";
import { FormControl } from "baseui/form-control";
import { Select } from "baseui/select";
import * as React from "react";
import { NEXT_PUBLIC_AUTH_TOKEN, PAGE_ID } from "../../constants";
import { inputStatusStyle } from "./componentCreationStyles";

export const ComponentGroup = function (props: any) {
  const [groups, setGroups] = React.useState([{}]);

  const getComponentGroups = async () => {
    const URL = `https://api.statuspage.io/v1/pages/${PAGE_ID}/component-groups`;
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    let xjson = await response.json();
    let options = [];
    for (let i = 0; i < xjson.length; i++) {
      options[i] = {
        key: xjson[i].id,
        id: xjson[i].id,
        label: xjson[i].name,
      };
    }
    setGroups(options);
  };

  React.useEffect(() => {
    getComponentGroups();
  }, []);

  return (
    <Block overrides={{
      Block: {
        style: {
          margin: "20px 0"
        }
      }
    }}>
    <FormControl label="Component group">
      <Select 
        creatable
        options={groups}
        labelKey="label"
        valueKey="id"
        onChange={({value}) => {
            props.handleGroupChange(value)
          }
        }
        value={props.value}
        placeholder="This component does not belong to a group"
        {...inputStatusStyle}
      />
    </FormControl>
    </Block>
  );
};