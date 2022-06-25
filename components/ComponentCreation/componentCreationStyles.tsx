import { InputProps } from "baseui/input";
import { SelectProps } from "baseui/select";
import { TextareaProps } from "baseui/textarea";
import { CheckboxProps } from "baseui/checkbox";
import { DatepickerProps } from "baseui/datepicker";

export const dateStyles: DatepickerProps = {
  overrides: {
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
              backgroundColor: "white"
            }
          }
        }
      }
    }
  }
}

export const checkBoxStyles: CheckboxProps = {
  overrides: {
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
  },
};

export const inputNameStyle: InputProps = {
  overrides: {
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
  },
};

export const inputDescriptionStyle: TextareaProps = {
  overrides: {
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
  },
}

export const inputStatusStyle: SelectProps = {
  overrides: {
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
  },
}