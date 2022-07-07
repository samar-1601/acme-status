import { InputProps } from "baseui/input";
import { SelectProps } from "baseui/select";
import { TextareaProps } from "baseui/textarea";
import { CheckboxProps } from "baseui/checkbox";
import { DatepickerProps } from "baseui/datepicker";
import { Block, BlockProps } from "baseui/block";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";

export const HEADER_STYLES: BlockProps["overrides"] = {
  Block: {
    style: {
      marginTop: "14px",
      marginBottom: "22px",
    },
  },
};

export const FORM_STYLES: BlockProps["overrides"] = {
  Block: {
    style: {
      width: "60%",
      margin: "auto",
    },
  },
};

export const DATE_STYLES: DatepickerProps["overrides"] = {
  Input: {
    props: {
      overrides: {
        Root: {
          style: ({ $isFocused }: any) => ({
            borderRadius: "8px !important",
            borderColor: $isFocused ? "#0E61F6" : "#E6E6E9",
            ":hover": {
              borderColor: "#0E61F6",
            },
            borderWidth: "1px",
          }),
        },
        Input: {
          style: {
            backgroundColor: "white",
          },
        },
        ClearIcon: {
          style: {
            marginLeft: "12px",
          },
        },
      },
    },
  },
};

export const CHECKBOX_STYLES: CheckboxProps["overrides"] = {
  Root: {
    style: {
      paddingTop: "15px",
    },
  },
  Checkmark: {
    style: ({ $checked }) => ({
      borderLeftColor: "blue",
      borderRightColor: "blue",
      borderTopColor: "blue",
      borderBottomColor: "blue",
      backgroundColor: $checked ? "blue" : "white",
      border: "1px solid blue",
      height: "16px",
      width: "16px",
      marginTop: "5px",
      borderRadius: "2px",
    }),
  },
};

export const INPUT_NAME_STYLE: InputProps["overrides"] = {
  Root: {
    style: ({ $isFocused }) => ({
      borderRadius: "8px !important",
      borderColor: $isFocused ? "#0E61F6" : "#E6E6E9",
      ":hover": {
        borderColor: "#0E61F6",
      },
      borderWidth: "1px",
    }),
  },
  InputContainer: {
    style: { backgroundColor: "white" },
  },
};

export const INPUT_DESCRIPTION_STYLE: TextareaProps["overrides"] = {
  Input: {
    style: ({ $isFocused }) => ({
      borderRadius: "8px",
      ":hover": {
        borderColor: "#0E61F6",
      },
    }),
  },
  InputContainer: {
    style: {
      backgroundColor: "white",
      ":hover": {
        borderColor: "#0E61F6",
        borderRadius: "8px",
      },
    },
  },
};

export const INPUT_STATUS_STYLE: SelectProps["overrides"] = {
  ControlContainer: {
    style: ({ $isFocused }) => ({
      backgroundColor: "white",
      borderRadius: "8px !important",
      borderColor: $isFocused ? "#0E61F6" : "#E6E6E9",
      ":hover": {
        borderColor: "#0E61F6",
      },
      borderWidth: "1px",
    }),
  },
};

export const COLORFULL_BAR_WRAPPER: BlockProps["overrides"] = {
  Block: {
    style: {
      width: "100%",
      display: "flex",
      gap: "4px",
    },
  },
};

export const COMPONENT_HEADER: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
  },
};

export const HORIZONTAL_LINE: BlockProps["overrides"] = {
  Block: {
    style: {
      border: "0.5px solid rgb(211,211,211)",
      width: "1px",
      flexGrow: 1,
      margin: "0px 15px",
    },
  },
};

export const COMPONENT_TIMELINE_ROW: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "center",
      flexDirection: "row",
      color: "grey",
      fontSize: "14px",
    },
  },
};

export const getColorFullBars = (count: number) => {
  let barsList = [];
  for (let i = 0; i < count; i++) {
    barsList.push(
      <StatefulPopover
        key={i}
        content={() => (
          <Block padding={"20px"} backgroundColor={"white"}>
            Details of this day !!
          </Block>
        )}
        triggerType={TRIGGER_TYPE.hover}
      >
        <Block
          overrides={{
            Block: {
              style: {
                width: "calc(100%/90)",
                height: "42px",
                backgroundColor: "rgb(211,211,211)",
                margin: "12px 0px",
              },
            },
          }}
        ></Block>
      </StatefulPopover>
    );
  }
  return barsList;
};

export const COMPONENT_NAME_TEXT: BlockProps["overrides"] = {
  Block: {
    style: {
      fontSize: "18px",
      fontWeight: 900,
    },
  },
};

export const COMPONENT_STATUS: BlockProps["overrides"] = {
  Block: {
    style: () => ({
      textTransform: "capitalize",
      fontSize: "17px",
      fontWeight: 700,
    }),
  },
};

export const SAVE_BUTTON: BlockProps["overrides"] = {
  Block: {
    style: {
      marginLeft: "20px",
      width: "92px",
      height: "34px",
    },
    props: {
      className: "primary-button",
    },
  },
}

export const CANCEL_BUTTON: BlockProps["overrides"] = {
  Block: {
    style: {
      marginLeft: "20px",
      width: "92px",
      height: "34px",
    },
    props: {
      className: "secondary-button",
    },
  },
}

export const FOOTER_WRAPPER: BlockProps["overrides"] = {
  Block: {
    style: {
      display: "flex",
      flexDirection: "row-reverse",
      right: 0,
      alignItems: "center",
      paddingBottom: "20px",
    },
    props: {
      className: "footer-bar",
    },
  },
}

export const COMPONENT_OVERRIDES: BlockProps["overrides"] = {
  Block: {
    style: {
      margin: "0px",
      display: "flex",
      justifyContent: "space-between",
    },
  },
};