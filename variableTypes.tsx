export interface STATUSType {
  [key: string]: number;
}

export interface SendComponentObject {
  [key: string]: string;
}

export interface SpecialEvent {
  nativeEvent: {
    offsetX: number;
  };
  target: {
    offsetWidth: number;
    classList: DOMTokenList;
    innerHTML: string;
  };
}

export interface JSONObject {
  name: String;
  id: String;
  status: string;
}

export interface optionType {
  option: {
    id: Number;
  };
}

export interface CreateIncidentProps {
  pageID: String[];
}

export interface ComponentObject {
  compName: string;
  compType: number;
  id: string;
  compId: string;
  selected: boolean;
}

export interface ComponentsAffectedProps {
  componentList: ComponentObject[];
  toggleCheckBox: Function;
  changeOption: Function;
}

export interface InputStatusprops {
  updateStatus: Function;
  incidentStatus: String;
  // updateStatusBarOnClick: Function
}

export interface ImageProps {
  imgUrl: string;
  title: string;
}

export interface statusComponentProps {
  selected: boolean;
  id: string;
  toggleCheckBox: Function;
  name: string;
  changeOption: Function;
  type: number;
}

export interface IncidentNameProps {
  handleNameChange: Function;
  value: string;
}

export interface IncidentMessageProps {
  updateIncidentMessage: Function;
  value: string | number | undefined;
}
