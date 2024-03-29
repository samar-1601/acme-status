export interface STATUSType {
  [key: string]: number;
}

export interface ComponentsJSONObject {
  name: String;
  id: String;
  status: string;
}

export interface ComponentObject {
  compName: string;
  compType: number;
  id: string;
  compId: string;
  selected: boolean;
}
