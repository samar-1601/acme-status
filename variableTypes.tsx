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

export interface IncidentCreationProps {
  components: ComponentObject[];
  currentStateOfPage: number;
  isSubmitClicked: boolean;
  handleSubmit: Function;
  incidentName: string;
  incidentStatus: string;
  type: string;
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
  handleComponentUpdate: Function;
}

export interface InputStatusprops {
  updateStatus: Function;
  incidentStatus: String;
}

export interface ImageProps {
  imgUrl: string;
  title: string;
}

export interface statusComponentProps {
  selected: boolean;
  id: string;
  name: string;
  handleChange: Function;
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

export interface pageData {
  name: String;
  id: String;
}

export interface UpdateIncidentProps {
  incidentId: string | string[] | undefined;
}

export interface IncidentFetchType {
  id: string;
  status: string;
}
