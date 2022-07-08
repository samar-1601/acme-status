// lib
import * as React from "react";

// components
import { Block } from "baseui/block";
import { Select } from "baseui/select";
import { FormControl } from "baseui/form-control";

// styles
import { INPUT_STATUS_STYLE } from "../overrides/componentFormStyles";

export const ComponentGroup = React.memo((props: any) => {
  const [groups, setGroups] = React.useState([{}]);
  const [place, setPlace] = React.useState<string>(
    "This component does not belong to a group"
  );

  const getComponentGroups = async () => {
    const URL = `https://api.statuspage.io/v1/pages/${process.env.NEXT_PUBLIC_PAGE_ID}/component-groups`;
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${process.env.NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
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
    <Block
      overrides={{
        Block: {
          style: {
            margin: "20px 0",
          },
        },
      }}
    >
      <FormControl label="Component group">
        <Select
          overrides={INPUT_STATUS_STYLE}
          creatable
          options={groups}
          labelKey="label"
          valueKey="id"
          onChange={(e) => {
            console.log(e);
            props.setVal(e.option);
            setPlace("");
          }}
          value={props.val}
          placeholder={place}
        />
      </FormControl>
    </Block>
  );
});
