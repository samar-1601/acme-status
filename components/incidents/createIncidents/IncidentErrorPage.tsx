import { Block } from "baseui/block";
import { IncidentErrorPageProps } from "../../../variableTypes";

export default function IncidentErrorPage(props: IncidentErrorPageProps) {
  return (
    <Block
      overrides={{
        Block: {
          style: {
            display: "flex",
            flexDirection: "column",
            paddingLeft: "20%",
            paddingRight: "20%",
            fontFamily: "Arial, Helvetica, sans-serif",
          },
        },
      }}
    >
      <Block
        overrides={{
          Block: {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh",
            },
          },
        }}
      >
        <h1>{props.message}</h1>
      </Block>
    </Block>
  );
}
