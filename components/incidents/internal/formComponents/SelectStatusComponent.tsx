//lib
import React from "react";

//components
import { Select } from "baseui/select";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";
import { ParagraphSmall } from "baseui/typography";
import { useStyletron } from "baseui";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";
import { Block } from "baseui/block";

//constants
import { ITEMS } from "../../../../constants";

//styles
import { COMPONENT_OVERRIDES } from "../form/overrides/BlockOverrides";
import { CHECKBOX_OVERRIDES } from "../form/overrides/CheckBoxOverrides";
import { SELECT_OPTION_OVERRIDES } from "../form/overrides/SelectOverrides";
import { POPOVER_MESSAGE_OVERRIDES } from "../form/overrides/PopoverOverrides";

interface ImageProps {
  imgUrl: string;
  title: string;
}
interface statusComponentProps {
  selected: boolean;
  id: string;
  name: string;
  handleChange: Function;
  type: number;
}

function Image(props: ImageProps) {
  return (
    <Block overrides={{ Block: { style: { display: "flex" } } }}>
      <img className="h-6 w-6 mr-1.5" src={props.imgUrl} />{" "}
      <Block>{props.title}</Block>
    </Block>
  );
}

/**
 * SelectStatusComponent component
 * @params props contains:
 * selected: component selected or not
 * id: index of the component
 * name: name of the component
 * handleChange: Function
 * type: Selected status type of the component
 */
export const SelectStatusComponent = React.memo(
  (props: statusComponentProps) => {
    const [css, theme] = useStyletron();

    //contains list of individual statuses with their photos
    const options = ITEMS.map((item, idx) => {
      return {
        label: (
          <Image key={item.imgUrl} title={item.title} imgUrl={item.imgUrl} />
        ),
        id: idx,
      };
    });

    //if component not selected show disabled status and statefulPopover on hover
    if (!props.selected) {
      return (
        <Block id={props.id} overrides={{ ...COMPONENT_OVERRIDES }}>
          <Checkbox
            labelPlacement={LABEL_PLACEMENT.right}
            checked={props.selected}
            onChange={(event) => {
              props.handleChange(props.id, !props.selected, props.type);
            }}
            name={props.id}
            overrides={{ ...CHECKBOX_OVERRIDES }}
          >
            {props.name}
          </Checkbox>

          <StatefulPopover
            overrides={{ ...POPOVER_MESSAGE_OVERRIDES }}
            content={
              <ParagraphSmall padding="scale500">
                Select Component to enable options
              </ParagraphSmall>
            }
            accessibilityType={"tooltip"}
            triggerType={TRIGGER_TYPE.hover}
          >
            <span className={css({ ...theme.typography.font300 })}>
              <Select
                options={options}
                disabled={!props.selected}
                backspaceRemoves={false}
                clearable={false}
                searchable={false}
                value={[options[props.type - 1]]}
                placeholder="Select color"
                onChange={(event) => {
                  props.handleChange(
                    props.id,
                    props.selected,
                    Number(event.option!.id) + 1
                  );
                }}
                overrides={{ ...SELECT_OPTION_OVERRIDES }}
              />
            </span>
          </StatefulPopover>
        </Block>
      );
    }
    //if component selected then enable select
    else {
      return (
        <Block id={props.id} overrides={{ ...COMPONENT_OVERRIDES }}>
          <Checkbox
            labelPlacement={LABEL_PLACEMENT.right}
            checked={props.selected}
            onChange={() => {
              props.handleChange(props.id, !props.selected, props.type);
            }}
            name={props.id}
            overrides={{ ...CHECKBOX_OVERRIDES }}
          >
            {props.name}
          </Checkbox>
          <Select
            options={options}
            disabled={!props.selected}
            backspaceRemoves={false}
            clearable={false}
            searchable={false}
            value={[options[props.type - 1]]}
            placeholder="Select color"
            onChange={(event) => {
              props.handleChange(
                props.id,
                props.selected,
                Number(event.option!.id) + 1
              );
            }}
            overrides={{ ...SELECT_OPTION_OVERRIDES }}
          />
        </Block>
      );
    }
  }
);
