// components
import { Block } from "baseui/block";
import { ComponentListItem } from "./ComponentListItem";

interface Props {
  setLoaded: Function;
  reFetch: Function;
  dataList: any;
}
export const RenderComponentsList = function (props: Props) {
  let dataList = props.dataList;
  let listItems = [];
  for (let i = 0; i < dataList.length; i++) {
    listItems[i] = (
      <ComponentListItem
        key={dataList[i].id}
        id={dataList[i].id}
        comp={dataList[i]}
        msg={dataList[i].msg}
        setLoaded={props.setLoaded}
        reFetch={props.reFetch}
      />
    );
  }
  return <Block>{listItems}</Block>;
};
