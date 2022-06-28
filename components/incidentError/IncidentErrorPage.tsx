//lib
import Link from "next/link";

//components
import { Block } from "baseui/block";
import { IncidentErrorPageProps } from "../../variableTypes";
import {
  errorPageStyle,
  mainStyle,
} from "../incidents/internal/form/styles/BlockStyles";

/*Will be displayed if error in processing incident update request or fetching components* */

export default function IncidentErrorPage(props: IncidentErrorPageProps) {
  return (
    <Block {...mainStyle}>
      <Block {...errorPageStyle}>
        <h1 className="header">{props.message}</h1>
        <Block>
          <Link href={"/incidents"}>
            <a className="link">Go back to Incidents Home Page</a>
          </Link>
        </Block>
      </Block>
    </Block>
  );
}
