import { Block } from "baseui/block";
import Link from "next/link";
import { IncidentErrorPageProps } from "../../../variableTypes";
import { errorPageStyle, mainStyle } from "./styles/BlockStyles";

export default function IncidentErrorPage(props: IncidentErrorPageProps) {
  return (
    <Block {...mainStyle}>
      <Block {...errorPageStyle}>
        <h1>{props.message}</h1>
        <Block>
          <Link href={"/incidents"}>
            <a>Go back to Incidents Home Page</a>
          </Link>
        </Block>
      </Block>
    </Block>
  );
}
